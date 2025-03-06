import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, X, Send, Minimize, Maximize } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface ChatWidgetProps {
  darkMode?: boolean;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ darkMode = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          content: "Olá! Como posso ajudar você hoje com o ERPFOUR?",
          sender: "assistant",
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate assistant response after a delay
    setTimeout(() => {
      const responses = [
        "Posso ajudar você com isso. O que mais você precisa saber?",
        "Entendi sua solicitação. Vou verificar isso para você.",
        "O módulo de RH pode ajudar com essa questão. Você gostaria de mais informações?",
        "Isso pode ser configurado nas configurações do sistema. Quer que eu mostre como?",
        "Você pode encontrar essa funcionalidade no módulo de Finanças. Precisa de ajuda para acessá-la?",
        "Vou encaminhar essa questão para nossa equipe técnica. Eles entrarão em contato em breve.",
        "Essa é uma ótima pergunta! A resposta depende da configuração do seu sistema.",
        "O ERPFOUR oferece várias soluções para esse problema. Gostaria de conhecer algumas opções?",
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="rounded-full w-14 h-14 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card
          className={`w-80 ${isMinimized ? "h-auto" : "h-96"} shadow-xl transition-all ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`}
        >
          <CardHeader
            className={`p-3 flex flex-row items-center justify-between border-b ${darkMode ? "border-gray-700" : "border-gray-200"} cursor-pointer`}
            onClick={toggleMinimize}
          >
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=ERPFOUR" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-sm font-medium">Assistente ERPFOUR</h3>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {isMinimized ? (
                <Maximize className="h-4 w-4" />
              ) : (
                <Minimize className="h-4 w-4" />
              )}
              <X
                className="h-4 w-4 hover:text-gray-500"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleChat();
                }}
              />
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent
                className={`p-3 overflow-y-auto flex-1 h-[calc(100%-6rem)] ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
              >
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 ${message.sender === "user" ? `${darkMode ? "bg-blue-600" : "bg-blue-500"} text-white` : `${darkMode ? "bg-gray-700" : "bg-white border border-gray-200"}`}`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : darkMode ? "text-gray-400" : "text-gray-500"}`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 ${darkMode ? "bg-gray-700" : "bg-white border border-gray-200"}`}
                      >
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <CardFooter
                className={`p-3 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}
              >
                <div className="flex w-full items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Digite sua mensagem..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}
                  />
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={inputValue.trim() === ""}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </div>
  );
};

export default ChatWidget;
