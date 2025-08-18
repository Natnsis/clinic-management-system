import React, { useState, useEffect } from "react";
import { MessageCircle, Search, Send, Paperclip, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Header from "@/components/patient/Header";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const conversations = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Physician",
      lastMessage: "Your lab results are ready. Everything looks normal.",
      time: "2 minutes ago",
      unread: true,
      avatar: "SJ",
      specialty: "General Medicine",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Nurse Practitioner",
      lastMessage: "Thanks for the update. I'll review your symptoms.",
      time: "1 hour ago",
      unread: false,
      avatar: "MC",
      specialty: "Primary Care",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      role: "Counselor",
      lastMessage: "Our appointment is confirmed for tomorrow at 3 PM.",
      time: "3 hours ago",
      unread: false,
      avatar: "ER",
      specialty: "Mental Health",
    },
    {
      id: 4,
      name: "Campus Pharmacy",
      role: "Pharmacy",
      lastMessage: "Your prescription is ready for pickup.",
      time: "1 day ago",
      unread: true,
      avatar: "CP",
      specialty: "Pharmacy Services",
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Dr. Sarah Johnson",
      content:
        "Hello John, I received your request about the persistent headache. Can you tell me more about when it started and any triggers you've noticed?",
      time: "10:30 AM",
      type: "received",
    },
    {
      id: 2,
      sender: "You",
      content:
        "Hi Dr. Johnson, it started about a week ago. It seems worse in the mornings and after long study sessions. No nausea or vision changes.",
      time: "10:35 AM",
      type: "sent",
    },
    {
      id: 3,
      sender: "Dr. Sarah Johnson",
      content:
        "Thanks for the details. The timing suggests it might be tension-related. I recommend trying regular breaks during study sessions and some gentle neck stretches. Would you like to schedule an in-person visit to discuss further?",
      time: "10:42 AM",
      type: "received",
    },
    {
      id: 4,
      sender: "Dr. Sarah Johnson",
      content:
        "Also, make sure you're staying hydrated and getting adequate sleep. These factors can significantly impact headache frequency.",
      time: "10:43 AM",
      type: "received",
    },
  ];

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-16">
        {" "}
        {/* Offset for fixed header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <MessageCircle className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            </div>
            <p className="text-gray-600">
              Communicate securely with your healthcare providers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search contacts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                    {filteredConversations.map((conv) => (
                      <button
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv)}
                        className={`w-full text-left p-4 hover:bg-blue-50 transition-colors ${
                          selectedConversation?.id === conv.id
                            ? "bg-blue-50 border-r-4 border-blue-500"
                            : ""
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10 ring-2 ring-blue-100">
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {conv.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium text-gray-900 truncate">
                                {conv.name}
                              </h3>
                              <span className="text-xs text-gray-500">
                                {conv.time}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 truncate">
                              {conv.role}
                            </p>
                            <p className="text-sm text-gray-700 truncate mt-1">
                              {conv.lastMessage}
                            </p>
                          </div>
                          {conv.unread && (
                            <div className="h-2 w-2 bg-blue-600 rounded-full flex-shrink-0"></div>
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
                  <div className="border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10 ring-2 ring-blue-100">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {selectedConversation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="font-semibold text-gray-900">
                          {selectedConversation.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {selectedConversation.role} •{" "}
                          {selectedConversation.specialty}
                        </p>
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
                              ? "bg-blue-600 text-white rounded-tr-none"
                              : "bg-white text-gray-900 rounded-tl-none shadow-sm border border-gray-200"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.type === "sent"
                                ? "text-blue-100"
                                : "text-gray-500"
                            }`}
                          >
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="border-t border-gray-200 px-6 py-4">
                    <div className="flex items-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-blue-600"
                      >
                        <Paperclip className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-blue-600"
                      >
                        <Smile className="h-5 w-5" />
                      </Button>
                      <div className="flex-1 relative">
                        <Input
                          type="text"
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            !e.shiftKey &&
                            handleSendMessage()
                          }
                          className="border-gray-200 rounded-xl pr-10 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <Button
                        size="icon"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                        onClick={handleSendMessage}
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Messages are encrypted and secure. For emergencies, please
                      call 911 or visit the clinic.
                    </p>
                  </div>
                </Card>
              ) : (
                <Card className="flex items-center justify-center h-96 text-center">
                  <CardContent>
                    <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No conversation selected
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Select a conversation from the list to view messages
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Start New Conversation
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
