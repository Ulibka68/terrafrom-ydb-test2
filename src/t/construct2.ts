class YdbTableMetaData {
  public tableName = '';

  public YQLUpsert = '';
}

class Base {
  static refM: YdbTableMetaData;
  static a = 'Base';

  static init(t: string) {
    console.log('init');
    console.log('this.constructor : ', this.constructor);
    console.log('this.constructor.a ', (this.constructor as typeof Base).a);
    console.log('this.a ', this.a);
    console.log('Derived.a : ', Derived.a);
    this.refM = new YdbTableMetaData();
    this.refM.tableName = t;
  }
}

class Derived extends Base {
  static refM: YdbTableMetaData;
  static a = 'Derived';

  constructor() {
    super();
  }
}

Derived.init('deadline');
console.log('Derived.init :', Derived.refM);

const d1 = new Derived();
const d2 = new Derived();
console.log(
  'd1.constructor.refM.tableName : ',
  (d1.constructor as typeof Base).refM.tableName
);
