import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InquiryManagement = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [replyText, setReplyText] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch inquiries on component mount
    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const response = await axios.get('http://localhost:3000/inquiry/get');
            setInquiries(response.data.data);
        } catch (error) {
            console.error('Error fetching inquiries:', error);
            setError('Failed to load inquiries.');
        } finally {
            setLoading(false);
        }
    };

    const handleReplyChange = (inquiryId, message) => {
        setReplyText(prev => ({ ...prev, [inquiryId]: message }));
    };

    const sendReply = async (inquiryId) => {
        const message = replyText[inquiryId];

        if (!message?.trim()) {
            alert('Please type your reply before sending.');
            return;
        }

        try {
            await axios.post(`http://localhost:3000/inquiry/reply/${inquiryId}`, {
                reply: message
            });

            setSuccessMessage('Reply sent successfully!');
            setReplyText(prev => ({ ...prev, [inquiryId]: '' }));
            fetchInquiries(); // Refresh the list

            // Clear success message after 3 seconds
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error sending reply:', error);
            setError('Failed to send reply.');
        }
    };

    if (loading) return <div className="p-4 text-center">Loading inquiries...</div>;
    if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Inquiries</h2>

            {successMessage && (
                <div className="mb-4 text-green-600">{successMessage}</div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 border">No</th>
                            <th className="py-2 border">Property Name</th>
                            <th className="py-2 border">User Name</th>
                            <th className="py-2 border">Message</th>
                            <th className="py-2 border">Inquiry Date</th>
                            <th className="py-2 border">Status</th>
                            <th className="py-2 border">Reply</th>
                            <th className="py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.map((inquiry, index) => (
                            <tr key={inquiry._id} className="text-center">
                                <td className="py-2 border">{index + 1}</td>
                                <td className="py-2 border">{inquiry.propertyId?.name || 'N/A'}</td>
                                <td className="py-2 border">{inquiry.userId?.name || 'N/A'}</td>
                                <td className="py-2 border">{inquiry.message || 'N/A'}</td>
                                <td className="py-2 border">
                                    {inquiry.inquiryDate
                                        ? new Date(inquiry.inquiryDate).toLocaleDateString()
                                        : 'N/A'}
                                </td>
                                <td className="py-2 border">{inquiry.status || 'Pending'}</td>
                                <td className="py-2 border">
                                    {inquiry.reply ? (
                                        <span className="text-green-600">{inquiry.reply}</span>
                                    ) : (
                                        <textarea
                                            rows="2"
                                            className="border p-1 w-full"
                                            placeholder="Type reply message..."
                                            value={replyText[inquiry._id] || ''}
                                            onChange={(e) => handleReplyChange(inquiry._id, e.target.value)}
                                        />
                                    )}
                                </td>
                                <td className="py-2 border">
                                    {inquiry.reply ? (
                                        <span className="text-green-600 font-medium">Reply Sent</span>
                                    ) : (
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                            onClick={() => sendReply(inquiry._id)}
                                        >
                                            Send Reply
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InquiryManagement;
