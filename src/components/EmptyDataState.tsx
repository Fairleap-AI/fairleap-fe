'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, TrendingUp, Heart, MessageCircle, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EmptyDataStateProps {
  onStartJourney?: () => void;
  onCreateTrip?: () => void;
  onTakeWellnessAssessment?: () => void;
}

export const EmptyDataState: React.FC<EmptyDataStateProps> = ({
  onStartJourney,
  onCreateTrip,
  onTakeWellnessAssessment
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  Baru
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Selamat Datang di FairLeap! 🎉
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Maaf, data kamu masih kosong. Mari mulai perjalanan untuk meningkatkan penghasilan dan kesejahteraan kamu sebagai driver GOTO!
            </p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Trip Card */}
          <Card className="hover:shadow-lg transition-shadow border-2 border-dashed border-blue-200 hover:border-blue-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Mulai Tracking Perjalanan</CardTitle>
              <CardDescription>
                Catat perjalanan pertama kamu untuk mulai melihat analisis penghasilan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={onCreateTrip}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Catat Perjalanan
              </Button>
            </CardContent>
          </Card>

          {/* Wellness Card */}
          <Card className="hover:shadow-lg transition-shadow border-2 border-dashed border-green-200 hover:border-green-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Cek Kesehatan Mental</CardTitle>
              <CardDescription>
                Lakukan assessment wellness untuk mendapatkan rekomendasi kesehatan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={onTakeWellnessAssessment}
                variant="outline"
                className="w-full border-green-600 text-green-600 hover:bg-green-50"
              >
                <Heart className="w-4 h-4 mr-2" />
                Mulai Assessment
              </Button>
            </CardContent>
          </Card>

          {/* AI Assistant Card */}
          <Card className="hover:shadow-lg transition-shadow border-2 border-dashed border-purple-200 hover:border-purple-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Chat dengan AI</CardTitle>
              <CardDescription>
                Tanya AI tentang tips meningkatkan penghasilan dan kesejahteraan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline"
                className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Mulai Chat
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Getting Started Guide */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-center text-xl">Panduan Memulai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center space-y-2">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto font-bold">
                  1
                </div>
                <h3 className="font-semibold">Catat Perjalanan</h3>
                <p className="text-gray-600">
                  Mulai dengan mencatat perjalanan harian kamu untuk tracking penghasilan
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto font-bold">
                  2
                </div>
                <h3 className="font-semibold">Assessment Wellness</h3>
                <p className="text-gray-600">
                  Lakukan assessment kesehatan mental untuk mendapatkan rekomendasi
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto font-bold">
                  3
                </div>
                <h3 className="font-semibold">Dapatkan Insight</h3>
                <p className="text-gray-600">
                  Lihat analisis dan prediksi penghasilan serta tips kesejahteraan
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            onClick={onStartJourney}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3"
          >
            Mulai Perjalanan Saya
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Gratis selamanya • Data aman • AI-powered insights
          </p>
        </div>
      </div>
    </div>
  );
}; 