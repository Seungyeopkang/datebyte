import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    console.error('Missing email credentials');
    return NextResponse.json({ success: false, error: 'Missing email configuration' }, { status: 500 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    })

    const data = await request.json()
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: '💕 데이트 응답이 도착했습니다!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f0f9ff; border-radius: 10px;">
          <h2 style="color: #0284c7;">💘 데이트 신청 응답 결과!</h2>
          <hr style="border: 1px solid #bae6fd;" />
          <p style="font-size: 16px;"><b>📅 만나는 날짜:</b> ${data.date ? new Date(data.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' }) : ''}</p>
          <p style="font-size: 16px;"><b>⏰ 만나는 시간:</b> ${data.time}</p>
          <p style="font-size: 16px;"><b>🍽️ 음식 메뉴:</b> ${Array.isArray(data.food) ? data.food.join(', ') : data.food}</p>
          <p style="font-size: 16px;"><b>✨ 데이트 활동:</b> ${data.movie}</p>
          <p style="font-size: 16px;"><b>🤩 기대 지수:</b> <span style="color: #2563eb; font-weight: bold;">${data.excitement} / 100</span></p>
        </div>
      `,
      attachments: [{
        filename: `date-response-${new Date().toISOString()}.json`,
        content: JSON.stringify(data, null, 2),
        contentType: 'application/json'
      }]
    })
    
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Failed to send email:', error)
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
    return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 500 })
  }
}