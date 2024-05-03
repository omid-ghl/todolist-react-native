declare namespace IItemsCard {
  interface IProps {
    title: string;
    creationDate: Date;
    index: number;
    isDone?: boolean;
  }
}

export {IItemsCard};
