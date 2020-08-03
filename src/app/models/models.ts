
export class ValCurs {
  date: string
  name: string
  valutes: Valutes[];
}


export class Valutes {
  val_id: string
  name: string
  value: number
  nominal: number
  charCode: string
  numCode: number

}

export class User{
  name: string;
  password: string;
}

export class History {
  id: Number;
  user_id: Number;
  firstValute: string
  secondValute: string
  firstSum: number
  resultSum: number
  date: string
  user: User
}
