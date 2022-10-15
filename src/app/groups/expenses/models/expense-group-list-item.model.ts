export class GroupExpenseListItem {
  public expenseId: number;
  public groupId?: number;
  public createdOn: Date;
  public name: string;
  public description?: string;
  public paidBy: number;
  public paidByName: string;
  public paidAmount: number;
  public toBePaidAmount: number;
  public isLent: boolean;

  constructor(args: any) {
    this.expenseId = args.expenseId;
    this.groupId = args.groupId;
    this.createdOn = args.createdOn;
    this.name = args.name;
    this.description = args.description;
    this.paidBy = args.paidBy;
    this.paidByName = args.paidByName;
    this.paidAmount = args.paidAmount;
    this.toBePaidAmount = args.toBePaidAmount;
    this.isLent = args.isLent;
  }
}
