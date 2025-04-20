import { birds, forest, plant } from '../../assets';

const BidTable = () => {
  // Sample data - in a real app, you'd likely pass this as props or fetch from an API
  const bids = [
    {
      id: 1,
      image: plant,
      title: "Plant and Pots",
      yourBid: "$1,000",
      currentBid: "$800",
      status: "Started"
    },
    {
      id: 2,
      image: forest,
      title: "Bird in Forest",
      yourBid: "$1,200",
      currentBid: "$1,100",
      status: "Started"
    },
    {
      id: 3,
      image:birds,
      title: "Woman in Forest",
      yourBid: "$700",
      currentBid: "$700",
      status: "Started"
    }
  ];

  return (
    <div className="p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="text-left pb-4 font-bold">Product</th>
            <th className="text-left pb-4 font-bold">Your bid</th>
            <th className="text-left pb-4 font-bold">Current bid</th>
            <th className="text-left pb-4 font-bold">Status</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid) => (
            <tr key={bid.id} className="border-b border-gray-100">
              <td className="py-6">
                <div className="flex items-center">
                  <div className="w-24 h-24 mr-4 flex-shrink-0">
                    <img 
                      src={bid.image} 
                      alt={bid.title}
                      className="w-full h-full object-cover"
                      // Using placeholder as actual images aren't available
                    //   onError={(e) => {
                    //     e.target.onerror = null;
                    //     e.target.src = "/api/placeholder/96/96";
                    //   }}
                    />
                  </div>
                  <span>{bid.title}</span>
                </div>
              </td>
              <td className="py-6">{bid.yourBid}</td>
              <td className="py-6">{bid.currentBid}</td>
              <td className="py-6">{bid.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BidTable;