import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  Search,
  Send,
  X,
  Paperclip,
  Smile,
  Plus,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StaffSidebar from "@/components/staff/StaffSidebar";

const StaffMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);

  // Mock data
  const conversations = [
    {
      id: 1,
      name: "Dr. Michael Chen",
      role: "Nurse Practitioner",
      department: "Primary Care",
      lastMessage: "Thanks for the update on patient John Doe's lab results.",
      time: "2 minutes ago",
      unread: true,
      avatar: "MC",
      specialty: "Primary Care",
    },
    {
      id: 2,
      name: "Dr. Emily Rodriguez",
      role: "Counselor",
      department: "Mental Health",
      lastMessage:
        "Our team meeting is confirmed for tomorrow at 10 AM in Conference Room B.",
      time: "1 hour ago",
      unread: false,
      avatar: "ER",
      specialty: "Mental Health",
    },
    {
      id: 3,
      name: "Dr. James Taylor",
      role: "Physician",
      department: "Internal Medicine",
      lastMessage:
        "I've reviewed the new patient intake form and have some suggestions.",
      time: "3 hours ago",
      unread: true,
      avatar: "JT",
      specialty: "Internal Medicine",
    },
    {
      id: 4,
      name: "Nursing Team",
      role: "Group Chat",
      department: "Nursing",
      lastMessage:
        "Reminder: Shift change at 3 PM. Please ensure all patient notes are updated.",
      time: "1 day ago",
      unread: false,
      avatar: "NT",
      specialty: "Nursing Staff",
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Dr. Michael Chen",
      content:
        "Hi Sarah, I received your request about patient John Doe's persistent headache. Can you share more details about his symptoms and any medications he's taking?",
      time: "10:30 AM",
      type: "received",
    },
    {
      id: 2,
      sender: "You",
      content:
        "Hi Michael, thanks for getting back to me. The patient reports headaches mainly in the mornings and after long study sessions. No nausea or vision changes. He's currently taking over-the-counter pain relievers.",
      time: "10:35 AM",
      type: "sent",
    },
    {
      id: 3,
      sender: "Dr. Michael Chen",
      content:
        "Thanks for the details. The timing suggests it might be tension-related. I recommend trying regular breaks during study sessions and some gentle neck stretches. Would you like me to schedule an in-person visit for him?",
      time: "10:42 AM",
      type: "received",
    },
    {
      id: 4,
      sender: "Dr. Michael Chen",
      content:
        "Also, make sure he's staying hydrated and getting adequate sleep. These factors can significantly impact headache frequency.",
      time: "10:43 AM",
      type: "received",
    },
  ];

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // In a real app, this would send to backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  useEffect(() => {
    // Select first conversation by default
    if (!selectedConversation && conversations.length > 0) {
      setSelectedConversation(conversations[0]);
    }
  }, [selectedConversation, conversations]);

  return (
    <div className="min-h-screen bg-amber-50">
      <StaffSidebar />

      <div className="ml-64 p-8">
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <MessageCircle className="h-8 w-8 text-amber-600" />
            <h1 className="text-2xl font-bold text-amber-900">Messages</h1>
          </div>
          <p className="text-amber-700">
            Communicate securely with your colleagues and teams
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Conversations</CardTitle>
                <Button
                  size="sm"
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={() => setShowNewMessageModal(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </CardHeader>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400" />
                <Input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 mb-4"
                />
              </div>
              <CardContent className="p-0">
                <div className="divide-y divide-amber-100 max-h-96 overflow-y-auto">
                  {filteredConversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`w-full text-left p-4 hover:bg-amber-50 transition-colors ${
                        selectedConversation?.id === conv.id
                          ? "bg-amber-100 border-r-4 border-amber-500"
                          : ""
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 ring-2 ring-amber-200">
                          <AvatarFallback className="bg-amber-100 text-amber-600">
                            {conv.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-amber-900 truncate">
                              {conv.name}
                            </h3>
                            <span className="text-xs text-amber-500">
                              {conv.time}
                            </span>
                          </div>
                          <p className="text-xs text-amber-700 truncate">
                            {conv.role}
                          </p>
                          <p className="text-sm text-amber-800 truncate mt-1">
                            {conv.lastMessage}
                          </p>
                        </div>
                        {conv.unread && (
                          <div className="h-2 w-2 bg-amber-600 rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Messages View */}
          <div className="lg:col-span-2">
            {selectedConversation ? (
              <Card className="h-full flex flex-col">
                {/* Conversation Header */}
                <div className="border-b border-amber-100 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10 ring-2 ring-amber-200">
                        <AvatarFallback className="bg-amber-100 text-amber-600">
                          {selectedConversation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="font-semibold text-amber-900">
                          {selectedConversation.name}
                        </h2>
                        <p className="text-sm text-amber-700">
                          {selectedConversation.role} •{" "}
                          {selectedConversation.department}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-amber-600 border-amber-200 hover:bg-amber-50"
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-amber-600 border-amber-200 hover:bg-amber-50"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.type === "sent" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          msg.type === "sent"
                            ? "bg-amber-600 text-white rounded-tr-none"
                            : "bg-white text-amber-900 rounded-tl-none shadow-sm border border-amber-200"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.type === "sent"
                              ? "text-amber-100"
                              : "text-amber-500"
                          }`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="border-t border-amber-100 px-6 py-4">
                  <div className="flex items-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-amber-600 hover:text-amber-800"
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-amber-600 hover:text-amber-800"
                    >
                      <Smile className="h-5 w-5" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        type="text"
                        placeholder={`Message ${selectedConversation.name}...`}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          !e.shiftKey &&
                          handleSendMessage()
                        }
                        className="border-amber-200 rounded-xl pr-10 focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <Button
                      size="icon"
                      className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl"
                      onClick={handleSendMessage}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-xs text-amber-600 mt-2">
                    Messages are encrypted and secure. For urgent matters,
                    please use the phone system.
                  </p>
                </div>
              </Card>
            ) : (
              <Card className="flex items-center justify-center h-96 text-center">
                <CardContent>
                  <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-amber-900 mb-2">
                    No conversation selected
                  </h3>
                  <p className="text-amber-700 mb-4">
                    Select a conversation from the list to view messages
                  </p>
                  <Button
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={() => setShowNewMessageModal(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Start New Conversation
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* New Message Modal */}
        {showNewMessageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-amber-900">
                  New Message
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowNewMessageModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-amber-900 mb-2 block">
                    To
                  </label>
                  <Input
                    type="text"
                    placeholder="Search staff members..."
                    className="border-amber-200 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-amber-900 mb-2 block">
                    Subject
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter subject..."
                    className="border-amber-200 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-amber-900 mb-2 block">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Type your message..."
                    className="w-full p-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  ></textarea>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowNewMessageModal(false)}
                    className="text-amber-700 border-amber-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={() => setShowNewMessageModal(false)}
                  >
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffMessages;
