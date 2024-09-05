import AddNewItem from '../components/AddNewItem';
import AdminItemsTable from '../components/AdminItemsTable';
import '../CSS/AdminPage.css'; 
import { useCart } from '../components/CartContext';
import PaymentLogsTable from '../components/PaymentLogsTable';

const AdminPage = () => {
  const { items, setItems } = useCart();

  return (
    <div>
      <div className="container2">
        <AddNewItem items={items} setItems={setItems} />
      </div>
      <div className="table-wrapper">
        <AdminItemsTable items={items} setItems={setItems} />
      </div>
      <div className="table-wrapper">
        <PaymentLogsTable />
      </div>
    </div>
  );
};

export default AdminPage;
