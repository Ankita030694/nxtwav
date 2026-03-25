import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faChartLine,
  faPlus,
  faEdit,
  faTrash,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

import { db, auth, storage } from '@/lib/firebase';
import { useAuth } from "@/hooks/useAuth";
import { AdminSidebar } from "@/components/AdminSidebar";
import TiptapEditor from '@/components/TiptapEditor';
import { Loader2 } from "lucide-react";
import SEO from "@/components/SEO";
import logo from "@/assets/nxtwav-logo-v2.png";

const BLOG_DRAFT_KEY = 'nxtwav:blogDraft';

interface FAQ {
  id?: string;
  question: string;
  answer: string;
}

interface Review {
  id?: string;
  name: string;
  rating: number;
  review: string;
  date?: string;
}

interface Blog {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  image: string;
  created: number;
  metaTitle?: string;
  metaDescription?: string;
  slug: string;
  faqs?: FAQ[];
  reviews?: Review[];
  author: string;
}

const AddBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [newBlog, setNewBlog] = useState<Blog>({
    title: '',
    subtitle: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    image: '',
    created: Date.now(),
    metaTitle: '',
    metaDescription: '',
    slug: '',
    faqs: [],
    reviews: [],
    author: 'NXTwav Team',
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState('');

  // Draft Saving Logic
  useEffect(() => {
    if (showBlogForm && newBlog) {
      const hasContent = 
        newBlog.title || 
        newBlog.subtitle || 
        newBlog.description || 
        (newBlog.faqs && newBlog.faqs.length > 0) ||
        newBlog.image;

      if (hasContent) {
        localStorage.setItem(BLOG_DRAFT_KEY, JSON.stringify({
          blog: newBlog,
          mode: formMode,
          timestamp: Date.now()
        }));
      }
    }
  }, [newBlog, showBlogForm, formMode]);

  const filteredBlogs = blogs.filter((blog) => 
    (blog.title && blog.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (blog.subtitle && blog.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (blog.description && blog.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'blogs'));
        const data = querySnapshot.docs.map((firestoreDoc) => {
          const docData = firestoreDoc.data();
          return {
            id: firestoreDoc.id,
            title: docData.title || '',
            subtitle: docData.subtitle || '',
            description: docData.description || '',
            date: docData.date || '',
            image: docData.image || '',
            created: docData.created || Date.now(),
            metaTitle: docData.metaTitle || '',
            metaDescription: docData.metaDescription || '',
            slug: docData.slug || '',
            faqs: docData.faqs || [],
            reviews: [],
            author: docData.author || 'NXTwav Team',
          };
        });

        const sortedData = data.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });

        setBlogs(sortedData);
      } catch (error) {
        console.error('Error fetching blogs data:', error);
      }
    };

    if (user) fetchBlogs();
  }, [user]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setNewBlog((prevState) => {
      if (
        name === 'title' &&
        (!prevState.slug || prevState.slug === generateSlug(prevState.title))
      ) {
        return {
          ...prevState,
          [name]: value,
          slug: generateSlug(value),
        };
      }

      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleEditorChange = (content: string) => {
    setNewBlog((prevState) => ({
      ...prevState,
      description: content,
    }));
  };

  const addFaq = () => {
    setNewBlog((prevState) => ({
      ...prevState,
      faqs: [...(prevState.faqs || []), { question: '', answer: '' }],
    }));
  };

  const removeFaq = (index: number) => {
    setNewBlog((prevState) => ({
      ...prevState,
      faqs: (prevState.faqs || []).filter((_, i) => i !== index),
    }));
  };

  const handleFaqChange = (
    index: number,
    field: 'question' | 'answer',
    value: string,
  ) => {
    setNewBlog((prevState) => {
      const updatedFaqs = [...(prevState.faqs || [])];
      updatedFaqs[index] = {
        ...updatedFaqs[index],
        [field]: value,
      };
      return {
        ...prevState,
        faqs: updatedFaqs,
      };
    });
  };

  const addReview = () => {
    setNewBlog((prevState) => ({
      ...prevState,
      reviews: [...(prevState.reviews || []), { name: '', rating: 5, review: '' }],
    }));
  };

  const removeReview = (index: number) => {
    setNewBlog((prevState) => ({
      ...prevState,
      reviews: (prevState.reviews || []).filter((_, i) => i !== index),
    }));
  };

  const handleReviewChange = (
    index: number,
    field: 'name' | 'rating' | 'review',
    value: string | number,
  ) => {
    setNewBlog((prevState) => {
      const updatedReviews = [...(prevState.reviews || [])];
      updatedReviews[index] = {
        ...updatedReviews[index],
        [field]: value,
      };
      return {
        ...prevState,
        reviews: updatedReviews,
      };
    });
  };

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round(height * (MAX_WIDTH / width));
              width = MAX_WIDTH;
            }
          } else if (height > MAX_HEIGHT) {
            width = Math.round(width * (MAX_HEIGHT / height));
            height = MAX_HEIGHT;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Canvas to Blob conversion failed'));
                return;
              }

              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });

              resolve(compressedFile);
            },
            'image/jpeg',
            0.7,
          );
        };

        img.onerror = () => {
          reject(new Error('Error loading image for compression'));
        };
      };

      reader.onerror = () => {
        reject(new Error('Error reading file for compression'));
      };
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      alert('Image is too large. Maximum size is 10MB.');
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      let fileToUpload = file;
      if (file.type.startsWith('image/')) {
        fileToUpload = await compressImage(file);
        // Show local preview immediately
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreview(event.target?.result as string);
        };
        reader.readAsDataURL(fileToUpload);
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreview(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }

      const storageRef = ref(storage, `blog-images/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileToUpload);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Error uploading image:', error);
          alert('Failed to upload image. Please try again.');
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setNewBlog((prevState) => ({
            ...prevState,
            image: downloadURL,
          }));
          setUploading(false);
          setUploadProgress(100);
        }
      );
    } catch (error) {
      console.error('Error in file upload process:', error);
      alert('Failed to process image. Please try again.');
      setUploading(false);
    }
  };


  const clearDraft = () => {
    localStorage.removeItem(BLOG_DRAFT_KEY);
  };

  const handleSubmitBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const blogWithMetadata = {
        ...newBlog,
        created: formMode === 'add' ? Date.now() : newBlog.created,
        date: new Date(newBlog.date).toISOString().split('T')[0],
      };

      const { faqs, reviews, ...blogData } = blogWithMetadata;
      let blogId = newBlog.id;

      if (formMode === 'add') {
        const docRef = await addDoc(collection(db, 'blogs'), blogData);
        blogId = docRef.id;
      } else if (blogId) {
        const blogRef = doc(db, 'blogs', blogId);
        await updateDoc(blogRef, blogData);
      }

      if (blogId && faqs && faqs.length > 0) {
        if (formMode === 'edit') {
          const faqsSnapshot = await getDocs(collection(db, 'blogs', blogId, 'faqs'));
          for (const faqDoc of faqsSnapshot.docs) {
            await deleteDoc(faqDoc.ref);
          }
        }

        for (const faq of faqs) {
          await addDoc(collection(db, 'blogs', blogId, 'faqs'), {
            question: faq.question,
            answer: faq.answer,
          });
        }
      }

      if (blogId && reviews) {
        const reviewsCollectionRef = collection(db, 'blogs', blogId, 'reviews');
        const reviewsSnapshot = await getDocs(reviewsCollectionRef);
        for (const reviewDoc of reviewsSnapshot.docs) {
           await deleteDoc(reviewDoc.ref);
        }

        for (const review of reviews) {
            await addDoc(reviewsCollectionRef, {
                author: review.name, 
                rating: Number(review.rating),
                comment: review.review, 
                date: review.date ? new Date(review.date).toISOString() : new Date().toISOString()
            });
        }
      }

      resetForm();
      clearDraft();

      const querySnapshot = await getDocs(collection(db, 'blogs'));
      const updatedBlogs = querySnapshot.docs.map((firestoreDoc) => {
        const docData = firestoreDoc.data();
        return {
          id: firestoreDoc.id,
          title: docData.title || '',
          subtitle: docData.subtitle || '',
          description: docData.description || '',
          date: docData.date || '',
          image: docData.image || '',
          created: docData.created || Date.now(),
          metaTitle: docData.metaTitle || '',
          metaDescription: docData.metaDescription || '',
          slug: docData.slug || '',
          faqs: [],
          reviews: [],
          author: docData.author || 'NXTwav Team',
        };
      });
      const sortedUpdatedBlogs = updatedBlogs.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });

      setBlogs(sortedUpdatedBlogs);
    } catch (error) {
      console.error('Error processing blog:', error);
    }
  };

  const handleEdit = async (blog: Blog) => {
    try {
      if (!blog.id) return;

      const faqsSnapshot = await getDocs(collection(db, 'blogs', blog.id, 'faqs'));
      const faqs = faqsSnapshot.docs.map((faqDoc) => ({
        id: faqDoc.id,
        question: faqDoc.data().question || '',
        answer: faqDoc.data().answer || '',
      }));

      const reviewsSnapshot = await getDocs(collection(db, 'blogs', blog.id, 'reviews'));
      const reviews = reviewsSnapshot.docs.map((reviewDoc) => {
         const data = reviewDoc.data();
         return {
             id: reviewDoc.id,
             name: data.author || '',
             rating: data.rating || 5,
             review: data.comment || '',
             date: data.date ? (data.date.toDate ? data.date.toDate().toISOString() : new Date(data.date).toISOString()) : undefined
         };
      });

      setNewBlog({ ...blog, faqs, reviews });
      setFormMode('edit');
      setShowBlogForm(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error fetching blog details:', error);
      setNewBlog(blog);
      setFormMode('edit');
      setShowBlogForm(true);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;

    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteDoc(doc(db, 'blogs', id));
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  const resetForm = () => {
    setNewBlog({
      title: '',
      subtitle: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      image: '',
      created: Date.now(),
      metaTitle: '',
      metaDescription: '',
      slug: '',
      faqs: [],
      reviews: [],
      author: 'NXTwav Team',
    });
    setFormMode('add');
    setShowBlogForm(false);
    setImagePreview(null);
  };

  const handleCancelForm = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      resetForm();
      clearDraft();
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="animate-spin w-8 h-8 text-primary"/></div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex bg-background min-h-screen text-foreground">
      <SEO title="Manage Blogs | NXTwav Academy" description="Admin dashboard to manage blogs." noindex={true} />
      <AdminSidebar />
      <div className="flex-1 md:ml-64 p-4 pt-24 pb-12 overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <div className="bg-card/50 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-border mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
                Blogs Dashboard
              </h1>
              <div className="w-32 h-1 bg-primary rounded-full"></div>
            </div>
            <div className="flex flex-col items-end gap-4">
              <img src={logo} alt="NXTwav Logo" className="h-10 w-auto object-contain hidden sm:block" />
              <motion.button
                 onClick={() => {
                    if (showBlogForm) {
                      if (newBlog.title || newBlog.description) {
                         if(window.confirm('You have unsaved changes. Do you want to discard them?')) {
                           resetForm();
                           clearDraft();
                         }
                      } else {
                        resetForm();
                      }
                    } else {
                      const savedDraft = localStorage.getItem(BLOG_DRAFT_KEY);
                      if (savedDraft) {
                        try {
                          const { blog, mode } = JSON.parse(savedDraft);
                          if (window.confirm('We found an unsaved blog draft. Would you like to restore it?')) {
                            setNewBlog(blog);
                            setFormMode(mode || 'add');
                            setShowBlogForm(true);
                            return;
                          } else {
                            clearDraft();
                          }
                        } catch (e) {
                          clearDraft();
                        }
                      }
                      setFormMode('add');
                      setShowBlogForm(true);
                    }
                  }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold shadow-lg transition-all"
              >
                <FontAwesomeIcon icon={showBlogForm ? faChartLine : faPlus} className="mr-2" />
                {showBlogForm ? 'View Blogs' : 'Add Blog'}
              </motion.button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card/50 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-border"
          >
            {showBlogForm ? (
              <AnimatePresence mode="wait">
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmitBlog}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-muted-foreground mb-2">
                        Blog Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={newBlog.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-background/50 border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="Enter blog title"
                      />
                    </div>

                    <div>
                      <label htmlFor="slug" className="block text-sm font-medium text-muted-foreground mb-2">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        id="slug"
                        name="slug"
                        value={newBlog.slug}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-background/50 border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="url-friendly-blog-name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="subtitle" className="block text-sm font-medium text-muted-foreground mb-2">
                        Subtitle/SEO Keywords
                      </label>
                      <input
                        type="text"
                        id="subtitle"
                        name="subtitle"
                        value={newBlog.subtitle}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-background/50 border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="Enter subtitle"
                      />
                    </div>

                    <div>
                      <label htmlFor="metaTitle" className="block text-sm font-medium text-muted-foreground mb-2">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        id="metaTitle"
                        name="metaTitle"
                        value={newBlog.metaTitle || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-background/50 border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="Enter meta title"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-muted-foreground mb-2">
                        Publication Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={newBlog.date}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-background/50 border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="image" className="block text-sm font-medium text-muted-foreground mb-2">
                        Blog Image
                      </label>
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center space-x-3">
                          <input
                            type="file"
                            id="image-upload"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <motion.button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-5 py-2.5 bg-muted text-foreground border border-border rounded-lg text-sm font-medium flex items-center transition-all"
                          >
                            <FontAwesomeIcon icon={faUpload} className="mr-2" />
                            {uploading ? 'Uploading...' : 'Choose Image'}
                          </motion.button>
                          {uploading && (
                            <div className="w-full max-w-sm mt-2">
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-primary"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${uploadProgress}%` }}
                                />
                              </div>
                              <p className="text-[10px] text-muted-foreground mt-1 text-right">{Math.round(uploadProgress)}% uploaded</p>
                            </div>
                          )}
                          {!uploading && newBlog.image && (
                            <span className="text-xs text-green-500 font-medium flex items-center gap-1">
                              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                              Ready to Publish
                            </span>
                          )}
                        </div>

                        {(imagePreview || newBlog.image) && (
                          <div className="mt-2 text-center sm:text-left">
                            <img
                              src={imagePreview || newBlog.image}
                              alt="Preview"
                              className="w-full max-w-sm h-48 object-cover rounded-lg border border-border shadow-md"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-muted-foreground mb-2">FAQs</label>
                     <div className="border border-border rounded-lg p-4 bg-background/30">
                        {(newBlog.faqs || []).map((faq, index) => (
                           <div key={index} className="mb-4 p-4 bg-muted/30 rounded-lg border border-border">
                              <div className="flex justify-between items-center mb-3">
                                 <h3 className="text-sm font-semibold">FAQ #{index + 1}</h3>
                                 <button type="button" onClick={() => removeFaq(index)} className="text-destructive text-xs hover:underline">Remove</button>
                              </div>
                              <input
                                 type="text"
                                 placeholder="Question"
                                 value={faq.question}
                                 onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                                 className="w-full mb-2 bg-background border border-border p-2 rounded text-sm"
                              />
                              <textarea
                                 placeholder="Answer"
                                 value={faq.answer}
                                 onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                                 className="w-full bg-background border border-border p-2 rounded text-sm"
                                 rows={2}
                              />
                           </div>
                        ))}
                        <button type="button" onClick={addFaq} className="text-sm text-primary font-medium hover:underline">+ Add FAQ</button>
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-muted-foreground mb-2">Reviews</label>
                     <div className="border border-border rounded-lg p-4 bg-background/30">
                        {(newBlog.reviews || []).map((review, index) => (
                           <div key={index} className="mb-4 p-4 bg-muted/30 rounded-lg border border-border">
                              <div className="flex justify-between items-center mb-3">
                                 <h3 className="text-sm font-semibold">Review #{index + 1}</h3>
                                 <button type="button" onClick={() => removeReview(index)} className="text-destructive text-xs hover:underline">Remove</button>
                              </div>
                              <div className="grid grid-cols-2 gap-2 mb-2">
                                 <input
                                    type="text"
                                    placeholder="Name"
                                    value={review.name}
                                    onChange={(e) => handleReviewChange(index, 'name', e.target.value)}
                                    className="bg-background border border-border p-2 rounded text-sm"
                                 />
                                 <select
                                    value={review.rating}
                                    onChange={(e) => handleReviewChange(index, 'rating', Number(e.target.value))}
                                    className="bg-background border border-border p-2 rounded text-sm"
                                 >
                                    {[1,2,3,4,5].map(r => <option key={r} value={r}>{r} Stars</option>)}
                                 </select>
                              </div>
                              <textarea
                                 placeholder="Review"
                                 value={review.review}
                                 onChange={(e) => handleReviewChange(index, 'review', e.target.value)}
                                 className="w-full bg-background border border-border p-2 rounded text-sm"
                                 rows={2}
                              />
                           </div>
                        ))}
                        <button type="button" onClick={addReview} className="text-sm text-primary font-medium hover:underline">+ Add Review</button>
                     </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-muted-foreground mb-2">
                      Blog Content
                    </label>
                    <div className="border border-border rounded-lg overflow-hidden bg-background">
                      <TiptapEditor content={newBlog.description} onChange={handleEditorChange} className="min-h-[400px]" />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <motion.button
                      type="button"
                      onClick={handleCancelForm}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-muted text-foreground rounded-lg font-medium border border-border transition-all"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold shadow-lg transition-all"
                    >
                      {formMode === 'add' ? 'Publish Blog' : 'Update Blog'}
                    </motion.button>
                  </div>
                </motion.form>
              </AnimatePresence>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-lg border border-border">
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full sm:max-w-xs px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                  />
                </div>
                
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Image</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                      {currentBlogs.length > 0 ? (
                        currentBlogs.map((blog) => (
                          <tr key={blog.id} className="hover:bg-muted/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                              {blog.date ? new Date(blog.date).toLocaleDateString() : '—'}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-foreground max-w-xs truncate">{blog.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {blog.image ? (
                                <img src={blog.image} alt="" className="w-12 h-12 rounded object-cover border border-border shadow-sm" />
                              ) : (
                                <span className="text-xs text-muted-foreground">No image</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex space-x-2">
                                <button onClick={() => handleEdit(blog)} className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDelete(blog.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors">
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-sm text-muted-foreground">
                            No blogs found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages || 1}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-muted text-foreground rounded border border-border disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="px-4 py-2 bg-muted text-foreground rounded border border-border disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AddBlogs;
