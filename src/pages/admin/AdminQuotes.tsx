import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminQuotes = () => {
  const [quotes, setQuotes] = useState<any[]>([]);

  const loadQuotes = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(`${API}/quotes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuotes(data.quotes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  const downloadPDF = async (id: string) => {
    try {
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

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Failed to download PDF");
    }
  };

  const approveQuote = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `${API}/quotes/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Quote Approved");
      loadQuotes();
    } catch (error) {
      console.error(error);
      alert("Failed to approve quote");
    }
  };

  const rejectQuote = async (id: string) => {
    const reason = prompt("Reason for rejection") || "";

    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `${API}/quotes/${id}/reject`,
        { reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Quote Rejected");
      loadQuotes();
    } catch (error) {
      console.error(error);
      alert("Failed to reject quote");
    }
  };

  const convertQuote = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `${API}/quotes/${id}/convert`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Order moved to Production");
      loadQuotes();
    } catch (error) {
      console.error(error);
      alert("Failed to convert quote");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-5xl font-bold text-[#B89D82] mb-10">Quotations</h1>

      {quotes.length === 0 ? (
        <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-10 text-center text-white/50">
          No Quotes Found
        </div>
      ) : (
        <div className="space-y-6">
          {quotes.map((quote) => (
            <div
              key={quote._id}
              className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6"
            >
              <div className="flex justify-between items-start gap-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold">
                    {quote.quoteNumber}
                  </h2>

                  <p className="text-white/50 mt-2">
                    Customer: {quote.customer?.name}
                  </p>

                  <p className="text-white/50">
                    Email: {quote.customer?.email}
                  </p>

                  <div className="mt-5 space-y-2">
                    <p>
                      <strong>Subtotal:</strong> ₹ {quote.subtotal}
                    </p>

                    <p>
                      <strong>Discount:</strong> ₹ {quote.discount}
                    </p>

                    <p>
                      <strong>GST:</strong> ₹ {quote.gstAmount}
                    </p>

                    <p className="text-xl font-bold text-[#B89D82]">
                      Grand Total: ₹ {quote.grandTotal}
                    </p>

                    <p>
                      <strong>Status:</strong> {quote.status}
                    </p>

                    {quote.approvedAt && (
                      <p className="text-green-400">
                        Approved: {new Date(quote.approvedAt).toLocaleString()}
                      </p>
                    )}

                    {quote.rejectedAt && (
                      <p className="text-red-400">
                        Rejected: {new Date(quote.rejectedAt).toLocaleString()}
                      </p>
                    )}

                    {quote.rejectionReason && (
                      <p className="text-yellow-300">
                        Reason: {quote.rejectionReason}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 min-w-[200px]">
                  <button
                    onClick={() => downloadPDF(quote._id)}
                    className="px-5 py-3 rounded-xl bg-[#B89D82] text-black font-semibold hover:bg-[#a98d72] transition"
                  >
                    Download PDF
                  </button>

                  <button
                    disabled={quote.status === "Approved"}
                    onClick={() => approveQuote(quote._id)}
                    className={`px-5 py-3 rounded-xl font-semibold transition ${
                      quote.status === "Approved"
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {quote.status === "Approved" ? "Approved" : "Approve"}
                  </button>

                  <button
                    disabled={quote.status === "Rejected"}
                    onClick={() => rejectQuote(quote._id)}
                    className={`px-5 py-3 rounded-xl font-semibold transition ${
                      quote.status === "Rejected"
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {quote.status === "Rejected" ? "Rejected" : "Reject"}
                  </button>

                  <button
                    onClick={() => convertQuote(quote._id)}
                    className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold"
                  >
                    Start Production
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminQuotes;
