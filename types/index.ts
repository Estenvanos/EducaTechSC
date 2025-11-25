export interface Module {
  _id: string;
  title: string;
  category: string;
}

export interface LessonBase {
  _id: string;
  moduleId: string;
  title: string;
  videoUrl: string;
  likes?: number;
  dislikes?: number;
}

export interface Lesson {
  _id: string;
  moduleId: string;
  title: string;
  videoUrl: string;
  likes?: number;
  dislikes?: number;
}