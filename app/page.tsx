"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, Coffee, Film, Utensils, Clock, Gamepad2, BookOpen, KeyRound, PenTool } from "lucide-react";
import confetti from "canvas-confetti";
import ThemedCard from "@/components/ThemedCard";
import Sparkles from "@/components/Sparkles";
import FloatingOrbs from "@/components/FloatingOrbs";
import FairyFooter from "@/components/FairyFooter";
import StepCard from "@/components/StepCard";
import SelectButton from "@/components/SelectButton";

interface Answers {
  isAvailable: boolean | null;
  date: Date | null;
  time: string;
  food: string[];
  movie: string;
  excitement: number;
}


const HeartBackground = dynamic(() => import("@/components/HeartBackground"), {
  ssr: false,
});

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 },
};

export default function EnchantingDateProposalApp() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    isAvailable: null,
    date: null,
    time: "",
    food: [],
    movie: "",
    excitement: 50,
  });

  const [hour, setHour] = useState<string>("");
  const [minute, setMinute] = useState<string>("");
  const [ampm, setAmpm] = useState<string>("");

  useEffect(() => {
    if (hour && minute && ampm) {
      setAnswers((prev) => ({ ...prev, time: `${ampm === 'AM' ? '오전' : '오후'} ${hour}:${minute}` }));
    } else {
      setAnswers((prev) => ({ ...prev, time: "" }));
    }
  }, [hour, minute, ampm]);

  const handleAnswer = (key: keyof Answers, value: Answers[keyof Answers]) => {
    setAnswers({ ...answers, [key]: value });
    setStep(step + 1);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const formatDate = (d: Date | null) => {
    if (!d) return "";
    try {
      return d.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' });
    } catch {
      return d.toDateString();
    }
  };

  const steps = [
    
    <motion.div key="step0" className="text-center" {...fadeInUp}>
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-600">
          저랑 데이트 하실래요?
        </span>{" "}
        💻💘
      </h1>
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        src="https://media1.tenor.com/m/59regbBE_kwAAAAd/tkthao219-bubududu.gif"
        alt="Cute bear proposal gif"
        className="w-full max-w-md mx-auto mb-4 rounded-lg shadow-lg"
      />
      <div className="space-x-4">
        <Button
          onClick={() => {
            handleAnswer("isAvailable", true);
            triggerConfetti();
          }}
          className="bg-gradient-to-r from-sky-500 to-blue-600 hover:brightness-95 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          좋아요, 당연히 갈래요! ✨
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-sky-300 text-sky-600 hover:bg-sky-100 font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              싫어요
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-sky-50 border-2 border-sky-300">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-sky-700">
                안 돼요, &quot;싫어요&quot;는 없어요! 😆
              </DialogTitle>
              <DialogDescription className="text-lg text-sky-600">
                무조건 저와 함께 가셔야 해요!
              </DialogDescription>
            </DialogHeader>
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src="https://media1.tenor.com/m/2XJN2YEYbIAAAAAd/peach-and.gif"
              alt="Excited bear gif"
              className="w-full max-w-md mx-auto mb-4 rounded-lg shadow-lg"
            />{" "}
            <Button
              onClick={() => {
                handleAnswer("isAvailable", true);
                triggerConfetti();
              }}
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:brightness-95 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              알겠어요, 갈게요! 💕
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>,

    
    <motion.div key="step1" className="text-center" {...fadeInUp}>
      <StepCard stepNumber={1} totalSteps={6}>
      <h2 className="text-4xl sm:text-5xl font-playfair font-bold mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-600">
          야호~! 우리 언제 만날까요?
        </span>{" "}
        📅
      </h2>
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        src="https://media.tenor.com/WiQQRwR2QFAAAAAi/cute-panda.gif"
        alt="Excited bear gif"
        className="w-full max-w-md mx-auto mb-6 rounded-2xl shadow-2xl shadow-sky-300/30"
      />
      <div className="mb-6 p-4 bg-white rounded-lg shadow-lg">
        <Calendar
          mode="single"
          selected={answers.date || undefined}
          onSelect={(date) => setAnswers({ ...answers, date: date || null })}
          className="mx-auto mb-4 w-full max-w-md"
        />
        <div className="flex gap-3 justify-center mt-4">
          <Select value={hour || undefined} onValueChange={(val) => setHour(val)}>
            <SelectTrigger className="w-24 bg-sky-50 border-sky-200 text-sky-700">
              <SelectValue placeholder="시" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                <SelectItem key={h} value={`${h}`}>
                  {h}시
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={minute || undefined} onValueChange={(val) => setMinute(val)}>
            <SelectTrigger className="w-20 bg-sky-50 border-sky-200 text-sky-700">
              <SelectValue placeholder="분" />
            </SelectTrigger>
            <SelectContent>
              {['00', '15', '30', '45'].map((m) => (
                <SelectItem key={m} value={m}>
                  {m}분
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={ampm || undefined} onValueChange={(val) => setAmpm(val)}>
            <SelectTrigger className="w-24 bg-sky-50 border-sky-200 text-sky-700">
              <SelectValue placeholder="오전/오후" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">오전 (AM)</SelectItem>
              <SelectItem value="PM">오후 (PM)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        onClick={() => setStep(step + 1)}
        disabled={!answers.date || !hour || !minute || !ampm}
        className="bg-gradient-to-r from-sky-500 to-blue-600 hover:brightness-95 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        <Clock className="mr-2 h-5 w-5" /> 데이트 날짜 정했어요!{" "}
        <Heart className="ml-2 h-5 w-5" />
      </Button>
      </StepCard>
    </motion.div>,

    
    <motion.div key="step2" className="text-center" {...fadeInUp}>
      <StepCard stepNumber={2} totalSteps={6}>
      <h2 className="text-4xl sm:text-5xl font-playfair font-bold mb-8">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-600">
          맛있는 건 뭐 먹을까요?
        </span>{" "}
        🍽️
      </h2>
      <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
        {[
          { name: "한식 🍲", icon: <Utensils className="w-6 h-6" /> },
          { name: "양식 🍝", icon: <Utensils className="w-6 h-6" /> },
          { name: "일식 🍣", icon: <Utensils className="w-6 h-6" /> },
          { name: "중식 🥟", icon: <Utensils className="w-6 h-6" /> },
          { name: "아시안 🍜", icon: <Utensils className="w-6 h-6" /> },
          { name: "디저트 & 카페 ☕", icon: <Coffee className="w-6 h-6" /> },
        ].map(({ name, icon }) => (
          <SelectButton
            key={name}
            icon={icon}
            label={name}
            isSelected={answers.food.includes(name)}
            onClick={() => {
              const newFood = answers.food.includes(name)
                ? answers.food.filter((f) => f !== name)
                : [...answers.food, name];
              setAnswers({ ...answers, food: newFood });
            }}
          />
        ))}
      </div>
      <Button
        onClick={() => setStep(step + 1)}
        disabled={answers.food.length === 0}
        className="bg-gradient-to-r from-sky-500 to-blue-600 hover:brightness-95 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        다 너무 맛있겠어요! 🍽️
      </Button>
      </StepCard>
    </motion.div>,

     
    <motion.div key="step3" className="text-center" {...fadeInUp}>
      <StepCard stepNumber={3} totalSteps={6}>
      <h2 className="text-4xl sm:text-5xl font-playfair font-bold mb-8">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-600">
          우리 같이 뭐 하고 놀까요?
        </span>{" "}
        ✨
      </h2>
      <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6">
        {[
          { name: "영화 관람", icon: <Film className="mx-auto mb-2 text-sky-600 w-7 h-7" /> },
          { name: "보드게임", icon: <Gamepad2 className="mx-auto mb-2 text-sky-600 w-7 h-7" /> },
          { name: "예쁜 카페", icon: <Coffee className="mx-auto mb-2 text-sky-600 w-7 h-7" /> },
          { name: "방탈출", icon: <KeyRound className="mx-auto mb-2 text-sky-600 w-7 h-7" /> },
          { name: "만화카페", icon: <BookOpen className="mx-auto mb-2 text-sky-600 w-7 h-7" /> },
          { name: "기타 (직접 입력)", icon: <PenTool className="mx-auto mb-2 text-sky-600 w-7 h-7" /> },
        ].map(({ name, icon }) => (
          <motion.button
            key={name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-sky-700 hover:bg-sky-100 border border-sky-100 font-bold py-5 px-6 rounded-xl shadow-md transition-colors duration-300 flex flex-col items-center justify-center"
            onClick={() => {
              if (name === "기타 (직접 입력)") {
                let customActivity = prompt("원하시는 데이트 활동을 입력해 주세요!");
                while (customActivity !== null && customActivity.trim() === "") {
                  customActivity = prompt("내용을 입력해 주셔야 다음으로 넘어가실 수 있어요! 원하시는 활동을 입력해 주세요:");
                }
                if (customActivity && customActivity.trim() !== "") {
                  handleAnswer("movie", customActivity.trim());
                }
              } else {
                handleAnswer("movie", name);
              }
            }}
          >
            {icon}
            {name}
          </motion.button>
        ))}
      </div>
      </StepCard>
    </motion.div>,

    
    <motion.div key="step4" className="text-center" {...fadeInUp}>
      <StepCard stepNumber={4} totalSteps={6}>
      <h2 className="text-4xl sm:text-5xl font-playfair font-bold mb-8">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-600">
          우리 데이트 얼마나 기대되시나요?
        </span>{" "}
        🤩
      </h2>
      <div className="max-w-lg mx-auto mb-8 p-8 bg-gradient-to-b from-white/80 to-sky-50/60 rounded-2xl shadow-lg border border-sky-100">
        <Slider
          defaultValue={[50]}
          max={100}
          step={25}
          onValueChange={(value) =>
            setAnswers({ ...answers, excitement: value[0] })
          }
        />
        <div className="flex justify-between mt-6 text-sm text-sky-600 font-semibold">
          <span>😐 얼른 가고 싶어요!</span>
          <span>🤩 완전 완전 기대돼요!!</span>
        </div>
      </div>
      <motion.div
        className="text-4xl font-playfair font-bold text-sky-700 mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        기대 지수: <span className="text-blue-600">{answers.excitement}%</span>
      </motion.div>
      <Button
        onClick={() => {
          setStep(step + 1);
          setTimeout(triggerConfetti, 500);
        }}
        className="bg-gradient-to-r from-sky-500 to-blue-600 hover:brightness-95 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        약속 확정하기! 💕
      </Button>
      </StepCard>
    </motion.div>,

     
    <motion.div key="step5" className="text-center" {...fadeInUp}>
      <StepCard stepNumber={6} totalSteps={6}>
      <h2 className="text-5xl sm:text-6xl font-playfair font-bold mb-8">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-600">
          데이트 약속 완성!
        </span>{" "}
        ✨
      </h2>
      <p className="text-lg text-sky-600 mb-3 font-poppins font-medium">
        우리 만나는 날:
      </p>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="inline-block bg-gradient-to-r from-sky-100 to-blue-100 px-6 py-4 rounded-2xl border border-sky-200 mb-8"
      >
        <p className="text-3xl font-playfair font-bold text-sky-700">
          {formatDate(answers.date)} {answers.time}
        </p>
      </motion.div>
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        src="https://media.tenor.com/yvUCU981VYoAAAAj/mochi-cat-goma.gif"
        alt="Excited bear gif"
        className="w-full max-w-md mx-auto mb-6 rounded-2xl shadow-2xl shadow-sky-300/30"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Heart className="text-sky-500 w-16 h-16 mx-auto mt-6 animate-pulse" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-8 space-y-3 text-lg text-sky-700 font-poppins"
      >
        <p className="text-base">우리는 맛있는 <span className="font-semibold">{answers.food.join(", ")}</span>(을)를 먹고,</p>
        <p className="text-base">그리고 함께 <span className="font-semibold italic">&quot;{answers.movie}&quot;</span>(을)를 즐길 거예요.</p>
        <p className="text-xl font-playfair font-bold mt-6">
          당신의 기대 지수: <span className="text-blue-600">{answers.excitement}/100</span>
        </p>
      </motion.div>
      </StepCard>
    </motion.div>,
  ];

  useEffect(() => {
    const saveAnswers = async () => {
      console.log('Saved answers:', answers);
      
      // Save to localStorage
      localStorage.setItem('dateProposalAnswers', JSON.stringify(answers));

      // Send to your email
      try {
        await fetch('/api/send-response', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(answers)
        });
      } catch (error) {
        console.error('Failed to send response:', error);
      }
    };

    if (step === steps.length - 1) {
      saveAnswers();
    }
  }, [step, answers, steps.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <Suspense fallback={null}>
        <HeartBackground />
      </Suspense>
      <div className="relative w-full max-w-3xl">
        <FloatingOrbs />
        <ThemedCard>
          <Sparkles count={18} />
          <AnimatePresence mode="wait">{steps[step]}</AnimatePresence>
        </ThemedCard>
        <FairyFooter />
      </div>
    </div>
  );
}
