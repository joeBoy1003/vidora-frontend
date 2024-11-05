export interface Video {
  id: number;
  title: string;
  video_file: string;
  uploaded_at: string;
}

export interface NavigationConfig {
  url: string;
  icon: React.ReactNode;
  label: string;
}