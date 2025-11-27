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

export interface User {
  _id: string;
  clerkId: string;
  fullName: string;
  email: string;
  likedLessons: string[];
  dislikedLessons: string[];
}


interface BaseMessage {
  main: string;
  options?: OptionBase[] | { [key: number]: OptionBase };
  exit?: OptionBase;
}


/* MENU INICIAL — index 0 */
interface InitialMessage extends BaseMessage {
options: Record<number, { info: string; index: number }>;
}

/* LISTA DE MÓDULOS — index 1 */
interface ModuleMessage extends BaseMessage {
  options: {
    label: string;
    moduleId: string;
    index: number;
  }[];
}

/* AJUDA LOGIN — index 2 */
interface HelpLoginMessage extends BaseMessage {
  options?: undefined;
}

/* LISTA DE AULAS — index 3 */
interface LessonMessage extends BaseMessage {
  options: {
    label: string;
    lessonId: string;
  }[];
}

export interface OptionBase {
  label?: string;
  info?: string;
  index?: number;
  moduleId?: string;
  lessonId?: string;
}


export type MessageProps =
  | InitialMessage
  | ModuleMessage
  | HelpLoginMessage
  | LessonMessage;
