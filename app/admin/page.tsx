'use client'

import { useState } from 'react'

interface StoredResponse {
  timestamp: string;
  data: {
    isAvailable: boolean | null;
    date: string | null;
    time: string;
    food: string[];
    movie: string;
    excitement: number;
  };
}

export default function AdminPage() {
  const [responses, setResponses] = useState<StoredResponse[]>([])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          setResponses([{
            timestamp: new Date().toISOString(),
            data: data
          }]);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">데이트 신청 응답 목록</h1>
      
      <div className="mb-8">
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-sky-50 file:text-sky-700
            hover:file:bg-sky-100"
        />
      </div>

      {responses.length === 0 ? (
        <p>응답 JSON 파일을 업로드하여 내용을 확인해 보세요!</p>
      ) : (
        responses.map((response) => (
          <div key={response.timestamp} className="mb-8 p-4 border rounded bg-white shadow-lg">
            <p className="text-lg font-semibold mb-2">
              응답 시간: {new Date(response.timestamp).toLocaleString('ko-KR')}
            </p>
            <div className="space-y-2 text-left">
              <p>날짜: {response.data.date ? new Date(response.data.date).toLocaleDateString('ko-KR') : '선택 안 됨'}</p>
              <p>시간: {response.data.time || '선택 안 됨'}</p>
              <p>음식 선택: {response.data.food.join(', ') || '선택 안 됨'}</p>
              <p>영화: {response.data.movie || '선택 안 됨'}</p>
              <p>기대 지수: {response.data.excitement}/100</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
} 