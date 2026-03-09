import { useState, useEffect, useRef, useCallback } from "react";
import { collection, query, orderBy, limit, startAfter, getDocs, DocumentData, QueryDocumentSnapshot, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { LeadRow } from "@/components/LeadRow";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  instagram?: string;
  linkedin?: string;
  message: string;
  createdAt: any;
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback((node: HTMLTableRowElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        // We use a functional approach to avoid dependency on the current states in the observer
        fetchLeadsWrapRef.current();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Using a ref to wrap fetchLeads so the intersection observer doesn't need to be recreated on every term change
  const fetchLeadsWrapRef = useRef(() => {});

  const fetchLeads = async (reset = false) => {
    if (loading) return;
    if (!reset && !hasMore) return;
    
    setLoading(true);
    try {
      let q;
      const leadsRef = collection(db, "inquiries");
      
      if (searchTerm) {
        // Note: Firestore prefix search is case-sensitive without a dedicated lower-case field
        const endTerm = searchTerm + "\uf8ff";
        if (reset) {
          q = query(leadsRef, orderBy("name"), where("name", ">=", searchTerm), where("name", "<=", endTerm), limit(50));
        } else if (lastVisible) {
          q = query(leadsRef, orderBy("name"), where("name", ">=", searchTerm), where("name", "<=", endTerm), startAfter(lastVisible), limit(50));
        }
      } else {
        if (reset) {
          q = query(leadsRef, orderBy("createdAt", "desc"), limit(50));
        } else if (lastVisible) {
          q = query(leadsRef, orderBy("createdAt", "desc"), startAfter(lastVisible), limit(50));
        }
      }

      if (!q) {
        setLoading(false);
        return;
      }

      const documentSnapshots = await getDocs(q);
      
      const newLeads = documentSnapshots.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Record<string, any>)
      })) as Lead[];

      setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1] || null);
      setHasMore(documentSnapshots.docs.length === 50);
      
      setLeads(prev => reset ? newLeads : [...prev, ...newLeads]);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadsWrapRef.current = () => fetchLeads(false);
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (authLoading || !user) return;
    const timer = setTimeout(() => {
      fetchLeads(true);
    }, 500);
    
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, authLoading, user]);

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="animate-spin w-8 h-8 text-primary"/></div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex bg-background min-h-screen text-foreground">
      <AdminSidebar />
      <div className="flex-1 md:ml-64 p-4 pt-24 pb-12 overflow-x-hidden">
        <div className="w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">Leads Dashboard</h1>
            <p className="text-muted-foreground">View and manage inquiries (Currently showing {leads.length} leads)</p>
          </div>
          
          <div className="mb-6 max-w-md">
            <Input 
              type="text" 
              placeholder="Search by name (case-sensitive)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background/50 backdrop-blur-sm"
            />
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
                    <TableHead>Instagram</TableHead>
                    <TableHead>LinkedIn</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead className="min-w-[200px]">Message</TableHead>
                    <TableHead className="min-w-[250px]">Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.length > 0 ? leads.map((lead, index) => {
                    const isLast = leads.length === index + 1;
                    return (
                      <LeadRow 
                        key={lead.id} 
                        lead={lead} 
                        index={index}
                        isLast={isLast} 
                        innerRef={isLast ? lastElementRef : undefined} 
                      />
                    );
                  }) : !loading && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                        No leads found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                  
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
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
        </div>
      </div>
    </div>
  );
}
