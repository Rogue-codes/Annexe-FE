const OrderTable = () => {
  // Sample data - in a real app, you'd likely pass this as props or fetch from an API
  const orders = [
    { id: '#210', date: 'July 23, 2022', status: 'Waiting payment', total: '$700 for 1 item' },
    { id: '#210', date: 'June 23, 2022', status: 'Waiting payment', total: '$1,000 for 1 item' },
    { id: '#210', date: 'May 26, 2022', status: 'Success', total: '$500 for 1 item' },
    { id: '#210', date: 'May 23, 2022', status: 'Success', total: '$600 for 1 item' },
    { id: '#210', date: 'May 23, 2022', status: 'Cancelled', total: '$200 for 1 item' },
  ];

  // Function to determine the status color class
  const getStatusClass = (status:string) => {
    switch (status) {
      case 'Success':
        return 'text-green-600';
      case 'Waiting payment':
        return 'text-amber-500';
      case 'Cancelled':
        return 'text-red-600';
      default:
        return '';
    }
  };

  return (
    <div className="p-5">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="text-left pt-2 pb-6 font-bold">Order</th>
            <th className="text-left pt-2 pb-6 font-bold">Date</th>
            <th className="text-left pt-2 pb-6 font-bold">Status</th>
            <th className="text-left pt-2 pb-6 font-bold">Total</th>
            <th className="text-left pt-2 pb-6 font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-5 text-[#004663] font-bold">{order.id}</td>
              <td className="py-5">{order.date}</td>
              <td className={`py-5 ${getStatusClass(order.status)}`}>{order.status}</td>
              <td className="py-5">{order.total}</td>
              <td className="py-5">
                <button className="bg-white border border-black px-5 py-2 font-bold">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;