// eslint-disable-next-line @typescript-eslint/no-namespace
namespace StaticInit4558 {
  class YdbTableMetaData {
    tableName = '';
    YQLUpsert = '';
  }

  class Base {
    static refMeta: YdbTableMetaData;

    constructor() {
      Base.refMeta.YQLUpsert = 'Base YQL';
      Base.refMeta.tableName = 'Base table';
    }

    printMeta() {
      // @ts-ignore
      console.log(this.constructor.refMeta.tableName);
    }

    static {
      Base.refMeta = new YdbTableMetaData();
    }
  }

  class Derived extends Base {
    static refMeta: YdbTableMetaData;

    constructor() {
      super();
      Derived.refMeta.tableName = 'Derived table';
    }

    static {
      Derived.refMeta = new YdbTableMetaData();
    }
  }

  // Base.refMeta=new YdbTableMetaData();
  const a = new Base();
  a.printMeta();
  const b = new Derived();
  b.printMeta();
}
