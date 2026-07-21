import { useEffect, useState } from "react";
import axios from "axios";
import API from "../services/api";

const Quotes = () => {
  const [quotes, setQuotes] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(`${API}/quotes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuotes(data.quotes);
    };

    load();
  }, []);

  const downloadPDF = async (id: string) => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API}/pdf/quote/${id}`, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");

    link.href = url;
    link.download = `Quote-${id}.pdf`;

    link.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto py-16">
      <h1 className="text-4xl font-bold mb-10">My Quotations</h1>

      <div className="space-y-6">
        {quotes.map((quote) => (
          <div key={quote._id} className="border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold">{quote.quoteNumber}</h2>

            <p>Status : {quote.status}</p>

            <p>Total : ₹{quote.grandTotal}</p>

            <button
              onClick={() => downloadPDF(quote._id)}
              className="mt-4 px-5 py-3 rounded-xl bg-black text-white"
            >
              Download Quote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quotes;
