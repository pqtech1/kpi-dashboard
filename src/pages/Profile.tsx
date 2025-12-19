import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Building, Phone, MapPin, Calendar, Save } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || "PQ Admin",
    email: "admin@jewelintegra.com",
    phone: "+91 98765 43210",
    company: "Jewel Integra Technologies",
    location: "Mumbai, India",
    role: "System Administrator",
    joinDate: "January 2024"
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
          User Profile
        </span>
        <h1 className="page-header text-3xl sm:text-4xl font-bold tracking-tight">
          My Profile
        </h1>
        <p className="max-w-xl text-sm sm:text-base text-muted-foreground">
          Manage your personal information and account settings
        </p>
        <div className="mt-2 h-1 w-16 rounded-full bg-primary/60" />
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-2xl">
                {formData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left flex-1">
              <CardTitle className="text-xl">{formData.name}</CardTitle>
              <CardDescription>{formData.role}</CardDescription>
              <p className="text-xs text-muted-foreground mt-1">
                @{user?.username || "pq.jewelintegra.demo"}
              </p>
            </div>
            <Button 
              variant={isEditing ? "default" : "outline"}
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="gap-2"
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              ) : (
                "Edit Profile"
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                Full Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                Phone Number
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center gap-2">
                <Building className="w-4 h-4 text-muted-foreground" />
                Company
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            {/* Join Date */}
            <div className="space-y-2">
              <Label htmlFor="joinDate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                Member Since
              </Label>
              <Input
                id="joinDate"
                value={formData.joinDate}
                disabled
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-primary">127</p>
            <p className="text-sm text-muted-foreground">Reports Generated</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-success">45</p>
            <p className="text-sm text-muted-foreground">Days Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-warning">12</p>
            <p className="text-sm text-muted-foreground">Alerts Resolved</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
