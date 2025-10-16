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
}
