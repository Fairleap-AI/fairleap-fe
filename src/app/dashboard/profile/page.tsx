"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDataSync } from "@/context/DataSyncContext";
import { SyncIndicator } from "@/components/ui/SyncIndicator";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiStar,
  FiCalendar,
  FiTruck,
  FiEdit2,
  FiSave,
  FiX,
  FiCamera,
  FiCheck,
  FiShield,
  FiWifi,
  FiWifiOff,
  FiRefreshCw
} from "react-icons/fi";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  // Use DataSync context untuk profile management
  const {
    userProfile,
    isGlobalLoading,
    globalError,
    isGlobalAuthenticated,
    lastSyncTime,
    loadUserProfile,
    updateUserProfile,
    clearGlobalError
  } = useDataSync();

  // Load profile data saat component mount
  useEffect(() => {
    if (isGlobalAuthenticated) {
      loadUserProfile();
    }
  }, [isGlobalAuthenticated, loadUserProfile]);

  // Set edited profile when profile loads
  useEffect(() => {
    if (userProfile) {
      setEditedProfile(userProfile);
    }
  }, [userProfile]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(userProfile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(userProfile);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = await updateUserProfile(editedProfile);
      if (success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedProfile((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVehicleChange = (field: string, value: string) => {
    setEditedProfile((prev: any) => ({
      ...prev,
      vehicle: {
        ...prev.vehicle,
        [field]: value
      }
    }));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <FiShield className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <FiRefreshCw className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <FiX className="h-3 w-3 mr-1" />
            Unverified
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isGlobalAuthenticated) {
    return (
      <DashboardLayout
        title="Profile"
        subtitle="Kelola informasi profil Anda"
        badge={{
          icon: FiWifiOff,
          text: "Offline"
        }}
      >
        <div className="p-6">
          <Alert className="bg-amber-50 border-amber-200">
            <FiWifiOff className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Authentication Required:</strong> Silakan login untuk mengakses profil Anda.
            </AlertDescription>
          </Alert>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Profile"
      subtitle="Kelola informasi profil dan pengaturan akun"
      badge={{
        icon: isGlobalAuthenticated ? FiWifi : FiWifiOff,
        text: lastSyncTime ? 
          `Last sync: ${lastSyncTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}` : 
          "No sync"
      }}
    >
      <div className="p-6">
        {/* Sync Indicator */}
        <SyncIndicator pageType="dashboard" showDetails={false} />

        {/* Error Alert */}
        {globalError && (
          <Alert className="bg-red-50 border-red-200 mb-6">
            <FiX className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 flex items-center justify-between">
              <span><strong>Error:</strong> {globalError}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearGlobalError}
                className="ml-2"
              >
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isGlobalLoading && !userProfile && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <FiRefreshCw className="h-6 w-6 animate-spin text-blue-600" />
              <span className="text-gray-600">Loading profile...</span>
            </div>
          </div>
        )}

        {/* Profile Content */}
        {userProfile && (
          <div className="space-y-6">
            {/* Profile Header */}
            <Card className="shadow-lg border-0 bg-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/default-avatar.png" />
                        <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                          {getInitials(userProfile.name)}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <button 
                          className="absolute -bottom-1 -right-1 h-8 w-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                          title="Change Profile Picture"
                          aria-label="Change Profile Picture"
                        >
                          <FiCamera className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <h1 className="text-3xl font-bold text-gray-900">{userProfile.name}</h1>
                        {getVerificationBadge(userProfile.verificationStatus)}
                      </div>
                      <div className="flex items-center space-x-4 text-gray-600">
                        <div className="flex items-center space-x-1">
                          <FiStar className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">{userProfile.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FiTruck className="h-4 w-4" />
                          <span>{userProfile.totalTrips.toLocaleString()} trips</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FiCalendar className="h-4 w-4" />
                          <span>Joined {formatDate(userProfile.joinDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {!isEditing ? (
                      <Button
                        onClick={handleEdit}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <FiEdit2 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          onClick={handleCancel}
                          disabled={isSaving}
                        >
                          <FiX className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSave}
                          disabled={isSaving}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {isSaving ? (
                            <FiRefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <FiSave className="h-4 w-4 mr-2" />
                          )}
                          Save Changes
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Profile Form */}
                <div className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            value={editedProfile.name || ''}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Enter your full name"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 text-gray-700">
                            <FiUser className="h-4 w-4" />
                            <span>{userProfile.name}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            type="email"
                            value={editedProfile.email || ''}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="Enter your email"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 text-gray-700">
                            <FiMail className="h-4 w-4" />
                            <span>{userProfile.email}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            value={editedProfile.phone || ''}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="Enter your phone number"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 text-gray-700">
                            <FiPhone className="h-4 w-4" />
                            <span>{userProfile.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Vehicle Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Information</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="vehicleType">Vehicle Type</Label>
                        {isEditing ? (
                          <Input
                            id="vehicleType"
                            value={editedProfile.vehicle?.type || ''}
                            onChange={(e) => handleVehicleChange('type', e.target.value)}
                            placeholder="e.g., Motorcycle, Car"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 text-gray-700">
                            <FiTruck className="h-4 w-4" />
                            <span>{userProfile.vehicle?.type}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="vehicleBrand">Brand & Model</Label>
                        {isEditing ? (
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              placeholder="Brand"
                              value={editedProfile.vehicle?.brand || ''}
                              onChange={(e) => handleVehicleChange('brand', e.target.value)}
                            />
                            <Input
                              placeholder="Model"
                              value={editedProfile.vehicle?.model || ''}
                              onChange={(e) => handleVehicleChange('model', e.target.value)}
                            />
                          </div>
                        ) : (
                          <div className="text-gray-700">
                            <span>{userProfile.vehicle?.brand} {userProfile.vehicle?.model}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="vehiclePlate">License Plate</Label>
                        {isEditing ? (
                          <Input
                            id="vehiclePlate"
                            value={editedProfile.vehicle?.plate || ''}
                            onChange={(e) => handleVehicleChange('plate', e.target.value)}
                            placeholder="e.g., B 1234 DEF"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 text-gray-700">
                            <FiMapPin className="h-4 w-4" />
                            <span className="font-mono">{userProfile.vehicle?.plate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Driver Rating</p>
                      <p className="text-3xl font-bold">{userProfile.rating}</p>
                      <p className="text-blue-100 text-xs">Out of 5.0</p>
                    </div>
                    <FiStar className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Total Trips</p>
                      <p className="text-3xl font-bold">{userProfile.totalTrips.toLocaleString()}</p>
                      <p className="text-green-100 text-xs">Completed successfully</p>
                    </div>
                    <FiTruck className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Account Status</p>
                      <p className="text-2xl font-bold capitalize">{userProfile.verificationStatus}</p>
                      <p className="text-purple-100 text-xs">Verification status</p>
                    </div>
                    <FiShield className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 