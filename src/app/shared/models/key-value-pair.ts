export class KeyValuePair<T, K> {
  public key: T;
  public value: K;

  constructor(args: any) {
    this.key = args.key;
    this.value = args.value;
  }
}
