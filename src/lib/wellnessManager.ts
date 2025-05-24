// Wellness State Management untuk integrasi Dashboard dan Wellness Page

export interface WellnessAnswer {
  questionId: string;
  value: string;
  score: number;
  timestamp: Date;
}

export interface WellnessData {
  answers: Record<string, WellnessAnswer>;
  overallScore: number;
  lastAssessment: Date;
  isCompleted: boolean;
}

export interface WellnessMetric {
  name: string;
  value: number;
  color: string;
  status: 'excellent' | 'good' | 'fair' | 'poor';
}

// Local Storage Keys
const WELLNESS_STORAGE_KEY = 'fairleap_wellness_data';
const WELLNESS_EXPIRY_HOURS = 24; // Data expired after 24 hours

// Wellness Questions Configuration
export const wellnessQuestions = [
  {
    id: "energy",
    question: "Bagaimana tingkat energi Anda hari ini?",
    category: "Energy",
    options: [
      { value: "low", label: "Lelah sekali", score: 20 },
      { value: "tired", label: "Cukup lelah", score: 40 },
      { value: "normal", label: "Normal", score: 60 },
      { value: "good", label: "Berenergi", score: 80 },
      { value: "excellent", label: "Sangat berenergi", score: 100 }
    ]
  },
  {
    id: "stress",
    question: "Seberapa stres Anda merasa hari ini?",
    category: "Stress",
    options: [
      { value: "none", label: "Tidak stres", score: 100 },
      { value: "low", label: "Sedikit stres", score: 80 },
      { value: "moderate", label: "Lumayan stres", score: 60 },
      { value: "high", label: "Cukup stres", score: 40 },
      { value: "very-high", label: "Sangat stres", score: 20 }
    ]
  },
  {
    id: "sleep",
    question: "Kualitas tidur semalam?",
    category: "Sleep",
    options: [
      { value: "poor", label: "Buruk (< 4 jam)", score: 20 },
      { value: "insufficient", label: "Kurang (4-5 jam)", score: 40 },
      { value: "fair", label: "Cukup (6-7 jam)", score: 60 },
      { value: "good", label: "Baik (7-8 jam)", score: 80 },
      { value: "excellent", label: "Sangat baik (> 8 jam)", score: 100 }
    ]
  },
  {
    id: "physical",
    question: "Kondisi fisik saat ini?",
    category: "Physical",
    options: [
      { value: "pain", label: "Ada nyeri/sakit", score: 20 },
      { value: "discomfort", label: "Tidak nyaman", score: 40 },
      { value: "neutral", label: "Biasa saja", score: 60 },
      { value: "comfortable", label: "Nyaman", score: 80 },
      { value: "excellent", label: "Sangat prima", score: 100 }
    ]
  }
];

// Save wellness data to localStorage
export const saveWellnessData = (data: WellnessData): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(WELLNESS_STORAGE_KEY, JSON.stringify({
      ...data,
      lastAssessment: data.lastAssessment.toISOString()
    }));
  }
};

// Load wellness data from localStorage
export const loadWellnessData = (): WellnessData | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(WELLNESS_STORAGE_KEY);
    if (!stored) return null;
    
    const data = JSON.parse(stored);
    const lastAssessment = new Date(data.lastAssessment);
    
    // Check if data is expired (older than 24 hours)
    const now = new Date();
    const hoursDiff = (now.getTime() - lastAssessment.getTime()) / (1000 * 60 * 60);
    
    if (hoursDiff > WELLNESS_EXPIRY_HOURS) {
      // Data expired, remove it
      localStorage.removeItem(WELLNESS_STORAGE_KEY);
      return null;
    }
    
    return {
      ...data,
      lastAssessment
    };
  } catch (error) {
    console.error('Error loading wellness data:', error);
    return null;
  }
};

// Check if user has completed wellness assessment today
export const hasCompletedWellnessToday = (): boolean => {
  const data = loadWellnessData();
  return data?.isCompleted || false;
};

// Calculate overall wellness score from answers
export const calculateWellnessScore = (answers: Record<string, WellnessAnswer>): number => {
  let totalScore = 0;
  let answeredQuestions = 0;

  wellnessQuestions.forEach(question => {
    const answer = answers[question.id];
    if (answer) {
      totalScore += answer.score;
      answeredQuestions++;
    }
  });

  return answeredQuestions > 0 ? Math.round(totalScore / answeredQuestions) : 0;
};

// Get wellness metrics for dashboard display
export const getWellnessMetrics = (): WellnessMetric[] => {
  const data = loadWellnessData();
  
  if (!data || !data.isCompleted) {
    return [
      { name: "Energy", value: 0, color: "#94a3b8", status: 'poor' },
      { name: "Stress", value: 0, color: "#94a3b8", status: 'poor' },
      { name: "Sleep", value: 0, color: "#94a3b8", status: 'poor' },
      { name: "Physical", value: 0, color: "#94a3b8", status: 'poor' }
    ];
  }

  const metrics: WellnessMetric[] = [];
  
  wellnessQuestions.forEach(question => {
    const answer = data.answers[question.id];
    if (answer) {
      const value = answer.score;
      let status: WellnessMetric['status'];
      let color: string;
      
      if (value >= 80) {
        status = 'excellent';
        color = '#10b981';
      } else if (value >= 60) {
        status = 'good';
        color = '#3b82f6';
      } else if (value >= 40) {
        status = 'fair';
        color = '#f59e0b';
      } else {
        status = 'poor';
        color = '#ef4444';
      }
      
      // Special handling for stress (lower is better)
      if (question.id === 'stress') {
        const stressValue = 100 - value; // Invert stress score
        if (stressValue <= 20) {
          status = 'excellent';
          color = '#10b981';
        } else if (stressValue <= 40) {
          status = 'good';
          color = '#3b82f6';
        } else if (stressValue <= 60) {
          status = 'fair';
          color = '#f59e0b';
        } else {
          status = 'poor';
          color = '#ef4444';
        }
      }
      
      metrics.push({
        name: question.category,
        value: question.id === 'stress' ? 100 - value : value,
        color,
        status
      });
    }
  });
  
  return metrics;
};

// Get overall wellness score
export const getOverallWellnessScore = (): number => {
  const data = loadWellnessData();
  return data?.overallScore || 0;
};

// Get wellness status text and color
export const getWellnessStatus = (score: number): { text: string; color: string; icon: string } => {
  if (score >= 80) {
    return { text: "Excellent", color: "#10b981", icon: "🟢" };
  } else if (score >= 60) {
    return { text: "Good", color: "#3b82f6", icon: "🔵" };
  } else if (score >= 40) {
    return { text: "Fair", color: "#f59e0b", icon: "🟡" };
  } else if (score > 0) {
    return { text: "Needs Attention", color: "#ef4444", icon: "🔴" };
  } else {
    return { text: "Not Assessed", color: "#94a3b8", icon: "⚪" };
  }
};

// Get wellness recommendations based on score
export const getWellnessRecommendations = (score: number): string[] => {
  if (score >= 80) {
    return [
      "Pertahankan pola hidup sehat Anda",
      "Anda siap untuk hari yang produktif",
      "Bagikan tips kesehatan ke sesama driver"
    ];
  } else if (score >= 60) {
    return [
      "Ambil break 15 menit setiap 2 jam",
      "Minum air putih minimal 8 gelas hari ini",
      "Lakukan peregangan ringan saat istirahat"
    ];
  } else if (score > 0) {
    return [
      "Pertimbangkan untuk istirahat lebih lama",
      "Tidur cukup 7-8 jam malam ini",
      "Jika kondisi berlanjut, konsultasi dengan dokter"
    ];
  } else {
    return [
      "Lakukan assessment wellness harian",
      "Monitor kondisi kesehatan Anda",
      "Prioritaskan kesehatan untuk performa optimal"
    ];
  }
};

// Clear wellness data (for testing or reset)
export const clearWellnessData = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(WELLNESS_STORAGE_KEY);
  }
};

// Get time until next assessment (in hours)
export const getTimeUntilNextAssessment = (): number => {
  const data = loadWellnessData();
  if (!data) return 0;
  
  const now = new Date();
  const nextAssessment = new Date(data.lastAssessment);
  nextAssessment.setHours(nextAssessment.getHours() + WELLNESS_EXPIRY_HOURS);
  
  const hoursDiff = (nextAssessment.getTime() - now.getTime()) / (1000 * 60 * 60);
  return Math.max(0, Math.ceil(hoursDiff));
}; 