import MenuBar from '../components/MenuBar/MenuBar';
import NotificationBar from '../components/NotificationBar/NotificationBar';

export default function MainLayout({ children }) {
  return (
    <main className="relative">
      <NotificationBar />
      {children}
      <MenuBar />
    </main>
  )
}
