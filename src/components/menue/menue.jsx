// בס"ד

import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './menue.css'
import { ChaniLogo } from "../registration/registration"

export const Menue = () => {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const location = useLocation()
    
    // מעקב אחרי גלילת המסך להוספת אפקטים
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        
        window.addEventListener('scroll', handleScroll)
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // סגירת התפריט הנייד בעת מעבר בין דפים
    useEffect(() => {
        setMobileMenuOpen(false)
    }, [location])

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    // בדיקה אם הקישור פעיל
    const isActive = (path) => {
        return location.pathname === path ? 'active' : ''
    }

    return (
        <div className="menu-container">
            <header className={`menu ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                <div className="logo-container">
                    <div className="menu-logo-wrapper">
                        <ChaniLogo />
                    </div>
                    <span className="logo-text">ניהול תורים</span>
                </div>
                
                <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                
                <nav className={`menu-links ${mobileMenuOpen ? 'open' : ''}`}>
                    <Link to={'/ccc'} className={`menu-item ${isActive('/ccc')}`}>
                        <i className="menu-icon fas fa-calendar-alt"></i>
                        <span className="text">לו"ז</span>
                    </Link>
                    <Link to={'/search'} className={`menu-item ${isActive('/search')}`}>
                        <i className="menu-icon fas fa-search"></i>
                        <span className="text">חיפוש</span>
                    </Link>
                    <Link to={'/login'} className={`menu-item ${isActive('/login')}`}>
                        <i className="menu-icon fas fa-user-plus"></i>
                        <span className="text">לקוחות</span>
                    </Link>
                    <Link to={'/manager'} className={`menu-item ${isActive('/manager')}`}>
                        <i className="menu-icon fas fa-cogs"></i>
                        <span className="text">ניהול</span>
                    </Link>
                    <Link to={'/remind'} className={`menu-item ${isActive('/remind')}`}>
                        <i className="menu-icon fas fa-bell"></i>
                        <span className="text">תזכורות</span>
                    </Link>
                </nav>
            </header>
        </div>
    )
}