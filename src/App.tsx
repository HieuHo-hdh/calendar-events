import './App.css'
import { ConfigProvider } from 'antd';
import { AppProvider } from '@/context/appContext'
import CalendarPage from '@/pages/Calendar'

function App() {
  return (
    <ConfigProvider 
      theme={{
        token: {
          colorPrimary: "#0F4C81",
        }
      }}
    >
      <AppProvider>
        <CalendarPage />
      </AppProvider>
    </ConfigProvider>
  )
}

export default App
