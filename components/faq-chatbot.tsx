"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Sparkles, X, Send } from "lucide-react"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

const faqData = [
  {
    question: "What exactly is SkillSparkle?",
    answer: "SkillSparkle is your personal career navigator! 🚀 Think of it as a magical map for your professional journey. We use smart AI to create a unique, step-by-step learning path just for you, connecting you with the best courses and skills needed to land your dream job. We take the guesswork out of 'what to learn next.'"
  },
  {
    question: "How does the AI create my personalized learning path?",
    answer: "It's a little bit of magic and a lot of smart tech! 🤖 When you sign up, you'll tell us about your current skills, your educational background, and most importantly, your career aspirations. Our AI then analyzes this information and compares it with real-time data on what skills top companies are looking for. It then designs the most efficient and effective 'pathway' of courses, micro-credentials, and certifications to bridge the gap between where you are and where you want to be. Your path even adapts as you progress!"
  },
  {
    question: "What are 'Verifiable Credentials' and why are they on the blockchain?",
    answer: "Think of a verifiable credential as a secure, digital trophy that's impossible to lose or fake. 🔗 When you complete a course, we issue a credential to your personal 'Skilling Passport.' By recording it on the blockchain, we ensure it's 100% authentic and owned by you. It allows you to instantly prove your skills to employers like MastrowCorp and Antler with a single click—no more paper certificates or long verification calls!"
  },
  {
    question: "Do I need to understand AI or blockchain to use this?",
    answer: "Absolutely not! That's our job. All the complex technology works silently in the background to make your experience as simple and beautiful as possible. Your job is to focus on your goals and your learning journey; we'll handle the rest. If you can use a social media app, you can use SkillSparkle."
  },
  {
    question: "Who is this platform for?",
    answer: "SkillSparkle is for anyone looking to bring clarity and direction to their career. This includes: Students just starting and exploring future career options. Professionals wanting to upskill or get that next promotion. Career-changers ready to pivot into a new and exciting industry."
  },
  {
    question: "How do I get started?",
    answer: "It's super easy! Sign Up: Create your free account in just a few clicks. Personalize: Answer a few fun questions about your goals and interests. Explore: Receive your first personalized learning path and start your journey!"
  }
]

export function FAQChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your SkillSparkle guide ✨ Ask me anything about our magical learning platform!",
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const findBestAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase()
    
    for (const faq of faqData) {
      const faqKeywords = faq.question.toLowerCase().split(' ')
      const questionKeywords = lowerQuestion.split(' ')
      
      const matchScore = faqKeywords.filter(keyword => 
        questionKeywords.some(qKeyword => 
          qKeyword.includes(keyword) || keyword.includes(qKeyword)
        )
      ).length
      
      if (matchScore >= 2) {
        return faq.answer
      }
    }
    
    return "That's a great question! I'm here to help you understand SkillSparkle. Could you be more specific? Try asking about our AI learning paths, blockchain credentials, or how to get started! ✨"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    
    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findBestAnswer(inputValue),
        isBot: true,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
          size="icon"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="w-96 h-[500px] shadow-2xl border-border/60 bg-card/95 backdrop-blur-xl">
          <CardContent className="p-0 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/60 bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold">SkillSparkle Guide</h3>
                  <p className="text-xs text-muted-foreground">Your magical learning companion</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-muted/50 text-foreground'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted/50 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Questions */}
            <div className="p-4 border-t border-border/60">
              <div className="space-y-2 mb-3">
                <p className="text-xs text-muted-foreground font-medium">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {faqData.slice(0, 3).map((faq, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 px-2 bg-transparent hover:bg-primary/10"
                      onClick={() => handleQuickQuestion(faq.question)}
                    >
                      {faq.question.split(' ').slice(0, 3).join(' ')}...
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 text-sm border border-border/60 rounded-xl bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <Button
                  size="icon"
                  className="w-8 h-8 rounded-xl"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default FAQChatbot
