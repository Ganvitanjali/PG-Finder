import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';  // toast import karna na bhoolen

const InquiryManagement = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [replyText, setReplyText] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchInquiries();
        checkUnreadReplies();  // Unread replies ko check karne wala function
    }, []);

    const fetchInquiries = async () => {
        try {
            const response = await axios.get('http://localhost:3000/inquiry/get');
            console.log('Fetched Inquiries:', response.data.data);
            setInquiries(response.data.data);
        } catch (error) {
            console.error('Error fetching inquiries:', error);
            setError('Failed to load inquiries.');
        } finally {
            setLoading(false);
        }
    };

    // Unread replies ke liye function
    const checkUnreadReplies = () => {
        const userId = localStorage.getItem("userId");  // ya aapke login ke hisaab se

        axios.get(`http://localhost:3000/inquiry/unread-replies/${userId}`)
            .then((res) => {
                if (res.data.success && res.data.data.length > 0) {
                    res.data.data.forEach(inquiry => {
                        toast.info(`🔔 Reply received for your inquiry on ${inquiry.propertyId.propertyName}`);
                    });
                }
            })
            .catch((err) => {
                console.error("Failed to check unread replies", err);
            });
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
            await axios.put(`http://localhost:3000/inquiry/inquiries/reply/${inquiryId}`, {
                reply: message
            });

            setSuccessMessage('Reply sent successfully!');
            setReplyText(prev => ({ ...prev, [inquiryId]: '' }));
            fetchInquiries();  // Refresh the list

            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error sending reply:', error);
            setError('Failed to send reply.');
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>Loading inquiries...</div>;
    if (error) return <div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>{error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>All Inquiries</h2>

            {successMessage && (
                <div style={{ marginBottom: '16px', color: 'green' }}>{successMessage}</div>
            )}

            <div style={{ overflowX: 'auto' }}>
                <table style={{ minWidth: '100%', backgroundColor: 'white', border: '1px solid #e0e0e0' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0', fontSize: '14px', color: '#4a4a4a' }}>
                            <th style={{ padding: '8px 12px', border: '1px solid #e0e0e0' }}>No</th>
                            <th style={{ padding: '8px 12px', border: '1px solid #e0e0e0' }}>Property Name</th>
                            <th style={{ padding: '8px 12px', border: '1px solid #e0e0e0' }}>User Name</th>
                            <th style={{ padding: '8px 12px', border: '1px solid #e0e0e0' }}>Message</th>
                            <th style={{ padding: '8px 12px', border: '1px solid #e0e0e0' }}>Inquiry Date</th>
                            <th style={{ padding: '8px 12px', border: '1px solid #e0e0e0' }}>Status</th>
                            <th style={{ padding: '8px 12px', border: '1px solid #e0e0e0' }}>Reply</th>
                            <th style={{ padding: '8px 12px', border: '1px solid #e0e0e0' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.map((inquiry, index) => (
                            <tr key={inquiry._id} style={{ textAlign: 'center', fontSize: '14px' }}>
                                <td style={{ padding: '8px 12px', border: '1px solid #e0e0e0' }}>{index + 1}</td>
                                <td style={{ padding: '8px 12px', border: '1px solid #e0e0e0' }}>{inquiry.propertyId?.propertyName || 'N/A'}</td>
                                <td style={{ padding: '8px 12px', border: '1px solid #e0e0e0' }}>
                                    {inquiry.userId
                                        ? `${inquiry.userId.firstName} ${inquiry.userId.lastName}`
                                        : 'N/A'}
                                </td>
                                <td style={{ padding: '8px 12px', border: '1px solid #e0e0e0' }}>{inquiry.message || 'N/A'}</td>
                                <td style={{ padding: '8px 12px', border: '1px solid #e0e0e0' }}>
                                    {inquiry.inquiryDate
                                        ? new Date(inquiry.inquiryDate).toLocaleDateString()
                                        : 'N/A'}
                                </td>
                                <td style={{ padding: '8px 12px', border: '1px solid #e0e0e0' }}>{inquiry.status || 'Open'}</td>
                                <td style={{ padding: '8px 12px', border: '1px solid #e0e0e0' }}>
                                    {inquiry.reply ? (
                                        <span style={{ color: 'green' }}>{inquiry.reply}</span>
                                    ) : (
                                        <textarea
                                            rows="2"
                                            style={{ border: '1px solid #e0e0e0', padding: '4px', width: '100%' }}
                                            placeholder="Type reply message..."
                                            value={replyText[inquiry._id] || ''}
                                            onChange={(e) => handleReplyChange(inquiry._id, e.target.value)}
                                        />
                                    )}
                                </td>
                                <td style={{ padding: '8px 12px', border: '1px solid #e0e0e0' }}>
                                    {inquiry.reply ? (
                                        <span style={{ color: 'green', fontWeight: '500' }}>Reply Sent</span>
                                    ) : (
                                        <button
                                            style={{ backgroundColor: '#3b82f6', color: 'white', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
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
