import { useState, useEffect, useRef, useCallback } from "react";
import { collection, query, orderBy, limit, startAfter, getDocs, DocumentData, QueryDocumentSnapshot, where, collectionGroup } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Loader2, Download, ListFilter, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { LeadRow } from "@/components/LeadRow";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import logo from "@/assets/nxtwav-logo-v2.png";
import { toast } from "sonner";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  course: string;
  instagram?: string;
  linkedin?: string;
  message: string;
  createdAt: any;
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [pageCursors, setPageCursors] = useState<(QueryDocumentSnapshot<DocumentData> | null)[]>([null]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const fetchLeads = async (pageIdx: number, reset = false) => {
    if (loading) return;
    
    setLoading(true);
    try {
      let q;
      const leadsRef = collection(db, "inquiries");
      const cursor = reset ? null : pageCursors[pageIdx];
      
      if (searchTerm) {
        const endTerm = searchTerm + "\uf8ff";
        if (!cursor) {
          q = query(leadsRef, orderBy("name"), where("name", ">=", searchTerm), where("name", "<=", endTerm), limit(50));
        } else {
          q = query(leadsRef, orderBy("name"), where("name", ">=", searchTerm), where("name", "<=", endTerm), startAfter(cursor), limit(50));
        }
      } else {
        if (!cursor) {
          q = query(leadsRef, orderBy("createdAt", "desc"), limit(50));
        } else {
          q = query(leadsRef, orderBy("createdAt", "desc"), startAfter(cursor), limit(50));
        }
      }

      const documentSnapshots = await getDocs(q);
      const newLeads = documentSnapshots.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Record<string, any>)
      })) as Lead[];

      setLeads(newLeads);
      
      const newLastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1] || null;
      setHasMore(documentSnapshots.docs.length === 50);
      
      if (reset) {
        setPageCursors([null, newLastVisible]);
        setCurrentPage(0);
      } else {
        const nextCursors = [...pageCursors];
        nextCursors[pageIdx + 1] = newLastVisible;
        setPageCursors(nextCursors);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (hasMore && !loading) {
      const nextIdx = currentPage + 1;
      setCurrentPage(nextIdx);
      fetchLeads(nextIdx);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0 && !loading) {
      const prevIdx = currentPage - 1;
      setCurrentPage(prevIdx);
      fetchLeads(prevIdx);
    }
  };

  const loadAllLeads = async () => {
    setIsLoadingAll(true);
    try {
      const leadsRef = collection(db, "inquiries");
      const q = query(leadsRef, orderBy("createdAt", "desc"));
      const documentSnapshots = await getDocs(q);
      const allLeads = documentSnapshots.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Record<string, any>)
      })) as Lead[];
      setLeads(allLeads);
      setCurrentPage(0);
      setHasMore(false);
      toast.success(`Loaded all ${allLeads.length} leads`);
    } catch (error) {
      console.error("Error loading all leads:", error);
      toast.error("Failed to load all leads");
    } finally {
      setIsLoadingAll(false);
    }
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      // Fetch all leads for export to ensure data completeness
      const leadsRef = collection(db, "inquiries");
      const q = query(leadsRef, orderBy("createdAt", "desc"));
      const documentSnapshots = await getDocs(q);
      const allLeads = documentSnapshots.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Record<string, any>)
      })) as Lead[];

      // Fetch all remarks for all leads efficiently using collectionGroup
      // Note: This may require a Firestore index to be created for the first time
      const historyRef = collectionGroup(db, "history");
      const historyQuery = query(historyRef, orderBy("createdAt", "desc"));
      const historySnapshots = await getDocs(historyQuery);
      
      const remarkMap: Record<string, string> = {};
      historySnapshots.docs.forEach(doc => {
        const inquiryId = doc.ref.parent.parent?.id;
        if (inquiryId && !remarkMap[inquiryId]) {
          remarkMap[inquiryId] = doc.data().remark || "";
        }
      });

      const headers = ["S.No.", "Date", "Name", "Email", "Phone", "Course", "Instagram", "LinkedIn", "State", "Message", "Latest Remark"];
      const csvContent = [
        headers.join(","),
        ...allLeads.map((lead, index) => [
          index + 1,
          lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleString().replace(/,/g, ' ') : "N/A",
          `"${(lead.name || '').replace(/"/g, '""')}"`,
          lead.email || '',
          lead.phone || '',
          lead.course || 'N/A',
          lead.instagram || "-",
          lead.linkedin || "-",
          lead.state || '',
          `"${(lead.message || "").replace(/"/g, '""').replace(/\n/g, ' ')}"`,
          `"${(remarkMap[lead.id] || "").replace(/"/g, '""').replace(/\n/g, ' ')}"`
        ].join(","))
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `nxtwav_leads_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("CSV exported successfully");
    } catch (error) {
      console.error("Error exporting CSV:", error);
      toast.error("Failed to export CSV");
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    if (authLoading || !user) return;
    const timer = setTimeout(() => {
      fetchLeads(0, true);
    }, 500);
    
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, authLoading, user]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth/login");
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="animate-spin w-8 h-8 text-primary"/></div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex bg-background min-h-screen text-foreground">
      <SEO title="Manage Leads | NXTwav Academy" description="Admin dashboard to manage leads." noindex={true} />
      <AdminSidebar />
      <div className="flex-1 md:ml-64 p-4 pt-24 pb-12 overflow-x-hidden">
        <div className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">Leads Dashboard</h1>
              <p className="text-muted-foreground">View and manage inquiries (Currently showing {leads.length} leads)</p>
            </div>
            
            <div className="flex items-center gap-4 self-end md:self-auto">
              <div className="flex flex-col items-end gap-2">
                <img src={logo} alt="NXTwav Logo" className="h-10 w-auto object-contain mb-1" />
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={loadAllLeads} 
                    disabled={isLoadingAll || loading}
                    className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all"
                  >
                    {isLoadingAll ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <LayoutGrid className="w-4 h-4 mr-2" />}
                    Load All Leads
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={handleExportCSV} 
                    disabled={isExporting}
                    className="shadow-lg shadow-primary/20"
                  >
                    {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                    Export CSV
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6 max-w-md">
            <div className="relative group">
              <Input 
                type="text" 
                placeholder="Search by name (case-sensitive)..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-background/50 backdrop-blur-sm border-border group-hover:border-primary/50 transition-all pl-10"
              />
              <ListFilter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>

          <div className="border border-border rounded-md overflow-hidden bg-card/50 backdrop-blur-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[80px]">S.No.</TableHead>
                    <TableHead className="w-[180px]">Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Instagram</TableHead>
                    <TableHead>LinkedIn</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead className="min-w-[200px]">Message</TableHead>
                    <TableHead className="min-w-[250px]">Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.length > 0 ? leads.map((lead, index) => {
                    return (
                      <LeadRow 
                        key={lead.id} 
                        lead={lead} 
                        index={currentPage * 50 + index}
                      />
                    );
                  }) : !loading && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                        No leads found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                  
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <div className="flex justify-center flex-col items-center gap-2">
                          <Loader2 className="w-6 h-6 animate-spin text-primary" />
                          <span className="text-sm text-muted-foreground">Loading leads...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border">
            <div className="text-sm text-muted-foreground">
              Showing page <span className="font-semibold text-foreground">{currentPage + 1}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 0 || loading}
                className="h-9 px-4"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={!hasMore || loading}
                className="h-9 px-4"
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
