export type TaskPriority = 'santai' | 'mendesak' | 'sangat mendesak';

export interface Task {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  priority: TaskPriority;
  completed: boolean;
}
