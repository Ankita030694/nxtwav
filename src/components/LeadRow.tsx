import { useState, useEffect } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { collection, query, orderBy, limit, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, Save, History } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

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

interface LeadRowProps {
  lead: Lead;
  index: number;
  isLast?: boolean;
  innerRef?: (node: HTMLTableRowElement) => void;
}

interface RemarkHistory {
  id: string;
  remark: string;
  createdAt: any;
}

export function LeadRow({ lead, index, isLast, innerRef }: LeadRowProps) {
  const [remark, setRemark] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isFetchingHistory, setIsFetchingHistory] = useState(false);
  const [history, setHistory] = useState<RemarkHistory[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLatestRemark = async () => {
      try {
        const historyRef = collection(db, "inquiries", lead.id, "history");
        const q = query(historyRef, orderBy("createdAt", "desc"), limit(1));
        const snapshots = await getDocs(q);
        if (!snapshots.empty) {
          const latestDoc = snapshots.docs[0].data();
          setRemark(latestDoc.remark || "");
        }
      } catch (error) {
        console.error("Error fetching latest remark:", error);
      }
    };
    fetchLatestRemark();
  }, [lead.id]);

  const handleSave = async () => {
    if (!remark.trim()) return;
    setIsSaving(true);
    try {
      const historyRef = collection(db, "inquiries", lead.id, "history");
      await addDoc(historyRef, {
        remark: remark.trim(),
        createdAt: serverTimestamp()
      });
      toast({
        title: "Remark Saved",
        description: "Your remark has been successfully saved.",
      });
    } catch (error) {
      console.error("Error saving remark:", error);
      toast({
        title: "Error",
        description: "Failed to save the remark.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const loadHistory = async () => {
    setIsFetchingHistory(true);
    try {
      const historyRef = collection(db, "inquiries", lead.id, "history");
      const q = query(historyRef, orderBy("createdAt", "desc"));
      const snapshots = await getDocs(q);
      const docs = snapshots.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<RemarkHistory, 'id'>)
      }));
      setHistory(docs);
    } catch (error) {
      console.error("Error loading history:", error);
    } finally {
      setIsFetchingHistory(false);
    }
  };

  const date = lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleString() : "N/A";

  const messageWords = lead.message ? lead.message.trim().split(/\s+/) : [];
  const isMessageLong = messageWords.length > 10;
  const shortMessage = isMessageLong ? messageWords.slice(0, 10).join(" ") + "..." : lead.message;

  const rowProps = isLast ? { ref: innerRef } : {};

  return (
    <TableRow {...rowProps} className="hover:bg-muted/50 transition-colors">
      <TableCell className="font-medium text-xs text-muted-foreground align-top py-2">{index + 1}</TableCell>
      <TableCell className="whitespace-nowrap font-medium text-xs text-muted-foreground align-top py-2">{date}</TableCell>
      <TableCell className="font-medium align-top py-2">{lead.name}</TableCell>
      <TableCell className="align-top py-2">{lead.email}</TableCell>
      <TableCell className="align-top py-2">{lead.phone}</TableCell>
      <TableCell className="align-top py-2">
        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20">
          {lead.course}
        </span>
      </TableCell>
      <TableCell className="align-top py-2">{lead.instagram || "-"}</TableCell>
      <TableCell className="align-top py-2">
        {lead.linkedin ? (
          <a href={lead.linkedin.startsWith('http') ? lead.linkedin : `https://${lead.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Profile
          </a>
        ) : "-"}
      </TableCell>
      <TableCell className="align-top py-2">{lead.state}</TableCell>
      <TableCell className="max-w-xs md:max-w-[250px] align-top py-2 whitespace-normal break-words">
        <div className="flex flex-col items-start gap-1">
          <span className="text-sm">{shortMessage}</span>
          {isMessageLong && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="h-auto p-0 text-xs text-primary">
                  View Full
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Message from {lead.name}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 text-sm text-foreground whitespace-pre-wrap">
                  {lead.message}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </TableCell>
      <TableCell className="min-w-[250px] align-top py-2">
        <div className="flex flex-col gap-2">
          <Textarea 
            placeholder="Add a remark..." 
            value={remark} 
            onChange={(e) => setRemark(e.target.value)} 
            className="min-h-[60px] bg-background/50 text-sm resize-none"
          />
          <div className="flex gap-2 justify-end">
            <Button size="sm" onClick={handleSave} disabled={isSaving || !remark.trim()} className="w-full sm:w-auto h-8 text-xs">
              {isSaving ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Save className="w-3 h-3 mr-1" />} Save
            </Button>
            
            <Dialog onOpenChange={(open) => {
              if (open) loadHistory();
            }}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="w-full sm:w-auto h-8 text-xs">
                  <History className="w-3 h-3 mr-1" /> History
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Remark History - {lead.name}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 flex flex-col gap-4">
                  {isFetchingHistory ? (
                    <div className="flex items-center justify-center p-8">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : history.length === 0 ? (
                    <div className="text-center p-8 text-muted-foreground text-sm">
                      No remarks found for this lead.
                    </div>
                  ) : (
                    history.map((item) => (
                      <div key={item.id} className="bg-muted/50 p-3 rounded-md text-sm">
                        <p className="text-foreground whitespace-pre-wrap">{item.remark}</p>
                        <p className="text-xs text-muted-foreground mt-2 text-right">
                          {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : "Just now"}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
