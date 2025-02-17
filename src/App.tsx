import './App.css'
import { ConfigProvider } from 'antd';
import { AppProvider } from '@/context/appContext'
import CalendarPage from '@/pages/Calendar'
import { CalendarContextProvider } from '@/context/calendarContext';

function App() {
  return (
    <ConfigProvider 
      theme={{
        token: {
          colorPrimary: "#0F4C81",
        },
        components: {
          Form: {
            "marginLG": 12,
          }
        }
      }}
    >
      <AppProvider>
        <CalendarContextProvider>
          <CalendarPage />
        </CalendarContextProvider>
      </AppProvider>
    </ConfigProvider>
  )
}

export default App
