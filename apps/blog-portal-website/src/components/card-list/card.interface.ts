/*
 * @Description:
 * @Author: liks
 * @Date: 2025-10-30 10:02:10
 * @LastEditors: liks
 * @LastEditTime: 2025-10-30 10:45:31
 */
export interface ListItem {
  name: string;
  key: string;
}

export interface CardProps {
  list?: ListItem[];
  title?: string;
  type?: 'category' | 'articles' | 'tag';
}
