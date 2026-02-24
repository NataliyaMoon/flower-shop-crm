export interface IInvoice {
  id: string;
  total_items: string;
  supplier_name: string;
  storage_name: string;
  total_sum: number;
  date: Date;
}

export interface InvoiceById {
  item_name: string;
  source_supplier_name: string;
  target_storage_name: string;
  qty: number;
  price: number;
  total_price: number;
  date: string;
  first_name: string;
  last_name: string;
};
