declare namespace Global {
  type RuleResType<T> = {
    code: number;
    message: string;
    data: T;
    total?: number;
  };
  /** 简化 Record<string, any> 的使用流程 */
  type Recordable<T = any> = Record<string, T>;

  interface MyRecord {
    [key: string]: any;
  }

  type ListRecord<T> = {
    list: T[];
    size: number;
    page: number;
    total: number;
    pages: number;
    isEnd: boolean;
  };
}
