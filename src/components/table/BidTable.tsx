export default function BidTable() {
  const bids = [
    { bidder: 'd********3', amount: '$700', time: '7/8/2022 03:21:59' },
    { bidder: 'd********3', amount: '$500', time: '3/8/2022 02:49:13' },
    { bidder: 'd********3', amount: '$450', time: '2/8/2022 11:10:39' },
    { bidder: 'd********3', amount: '$400', time: '30/7/2022 03:03:04' },
  ];

  return (
    <div className="overflow-x-auto mt-16 ">
      <table className="min-w-full border-collapse text-left">
        <thead>
          <tr className="border-b">
            <th className="py-4 px-4 font-semibold">Bidder</th>
            <th className="py-4 px-4 font-semibold">Bid Amount</th>
            <th className="py-4 px-4 font-semibold">Bid Time</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid, index) => (
            <tr key={index} className="border-b">
              <td className="py-8 px-4">{bid.bidder}</td>
              <td className="py-8 px-4">{bid.amount}</td>
              <td className="py-8 px-4">{bid.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
