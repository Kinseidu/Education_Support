import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ArrowLeft, Plus, Edit, Trash2, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import { z } from "zod";

const programSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  location: z.string().optional(),
  status: z.enum(["upcoming", "active", "completed"]).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

type ProgramFormData = z.infer<typeof programSchema>;

interface Program {
  _id: string;
  title: string;
  description: string;
  location?: string;
  status?: "upcoming" | "active" | "completed";
  startDate?: string;
  endDate?: string;
  coverImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPrograms() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<"newest" | "oldest" | "title">("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProgramFormData & { coverImageUrl?: string }>({
    title: "",
    description: "",
    location: "",
    status: "active",
    startDate: "",
    endDate: "",
    coverImageUrl: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<ProgramFormData>>({});

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get<{ items: Program[]; count: number }>("/admin/programs", {
        headers: { "Cache-Control": "no-cache" }
      });
      setPrograms(response.items || []);
    } catch (error) {
      toast.error("Failed to load programs");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAndSortedPrograms = () => {
    const q = searchTerm.trim().toLowerCase();
    let items = programs.slice();
    if (q) {
      items = items.filter((p) => (p.title + " " + p.description).toLowerCase().includes(q));
    }
    if (sortKey === "title") {
      items.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortKey === "oldest") {
      items.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else {
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return items;
  };

  const validateForm = (): boolean => {
    try {
      programSchema.parse(formData);
      setFormErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as string;
          errors[path] = err.message;
        });
        setFormErrors(errors as Partial<ProgramFormData>);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      // Remove empty string values from formData, but keep coverImageUrl
      const dataToSend = {
        ...formData,
        ...(formData.location === "" && { location: undefined }),
        ...(formData.startDate === "" && { startDate: undefined }),
        ...(formData.endDate === "" && { endDate: undefined }),
        ...(formData.coverImageUrl === "" && { coverImageUrl: undefined }),
      };
      
      if (editingId) {
        await apiClient.put(`/admin/programs/${editingId}`, dataToSend);
        toast.success("Program updated successfully");
      } else {
        await apiClient.post("/admin/programs", dataToSend);
        toast.success("Program created successfully");
      }
      setIsDialogOpen(false);
      setEditingId(null);
      setFormData({ title: "", description: "", location: "", status: "active", startDate: "", endDate: "", coverImageUrl: "" });
      fetchPrograms();
    } catch (error) {
      toast.error(editingId ? "Failed to update program" : "Failed to create program");
      console.error(error);
    }
  };

  const handleEdit = (item: Program) => {
    setEditingId(item._id);
    setFormData({
      title: item.title,
      description: item.description,
      location: item.location || "",
      status: item.status || "active",
      startDate: item.startDate || "",
      endDate: item.endDate || "",
      coverImageUrl: item.coverImageUrl || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;

    try {
      await apiClient.delete(`/admin/programs/${deleteTargetId}`);
      toast.success("Program deleted successfully");
      setIsDeleteDialogOpen(false);
      setDeleteTargetId(null);
      fetchPrograms();
    } catch (error) {
      toast.error("Failed to delete program");
      console.error(error);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingId(null);
    setFormData({ title: "", description: "", location: "", status: "active", startDate: "", endDate: "", coverImageUrl: "" });
    setFormErrors({});
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin-dashboard")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Manage Programs</h1>
              <p className="text-sm text-muted-foreground">Add and edit educational programs</p>
            </div>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Program
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : programs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No programs yet</p>
              <Button onClick={() => setIsDialogOpen(true)}>Create First Program</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Input placeholder="Search programs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <select value={sortKey} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortKey(e.target.value as "newest" | "oldest" | "title")} className="border rounded p-1">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="title">Title</option>
              </select>
            </div>

            {filteredAndSortedPrograms().map((program) => (
              <Card key={program._id} className="hover:bg-accent/50 transition-colors overflow-hidden">
                <CardContent className="py-4">
                  <div className="flex items-start justify-between gap-4">
                    {program.coverImageUrl && (
                      <div className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden border border-border">
                        <img src={program.coverImageUrl} alt={program.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2">{program.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{program.description}</p>
                      <div className="space-y-1 text-sm mb-2">
                        {program.location && <p><span className="font-medium">Location:</span> {program.location}</p>}
                        {program.startDate && <p><span className="font-medium">Start Date:</span> {new Date(program.startDate).toLocaleDateString()}</p>}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Updated {new Date(program.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(program)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setDeleteTargetId(program._id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Program" : "Add Program"}</DialogTitle>
            <DialogDescription>
              {editingId ? "Update the program details below" : "Create a new educational program"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            <div>
              <Label htmlFor="title">Program Title</Label>
              <Input
                id="title"
                placeholder="e.g., Scholarship Program"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              {formErrors.title && <p className="text-sm text-destructive mt-1">{formErrors.title}</p>}
            </div>

            <div>
              <Label htmlFor="coverImageUrl">Cover Image URL</Label>
              <Input
                id="coverImageUrl"
                placeholder="https://drive.google.com/uc?id=... or any image URL"
                value={formData.coverImageUrl}
                onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Paste URL from Google Drive, imgur, or any image hosting service
              </p>
              {formData.coverImageUrl && (
                <div className="mt-3 rounded-lg overflow-hidden border border-border">
                  <img 
                    src={formData.coverImageUrl} 
                    alt="Preview" 
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23666'%3EImage not found%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Program description..."
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {formErrors.description && <p className="text-sm text-destructive mt-1">{formErrors.description}</p>}
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Program location..."
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "upcoming" | "active" | "completed" })}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleDialogClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingId ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Program</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this program? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
