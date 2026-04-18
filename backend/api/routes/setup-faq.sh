#!/bin/bash
# FAQ System Quick Start
# This script sets up and initializes the entire FAQ system

set -e  # Exit on errors

echo "=========================================="
echo "🚀 FAQ Support System - Quick Start Setup"
echo "=========================================="
echo ""

# Check Python installation
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed"
    exit 1
fi

echo "✅ Python 3 found: $(python3 --version)"
echo ""

# Navigate to backend
cd "$(dirname "$0")/../"
echo "📂 Working directory: $(pwd)"
echo ""

# Step 1: Install dependencies
echo "📦 Step 1: Installing dependencies..."
echo ""
pip install --upgrade pip > /dev/null 2>&1 || true
pip install reportlab -q
pip install -q -r requirements.txt
echo "✅ Dependencies installed"
echo ""

# Step 2: Initialize database
echo "🗄️  Step 2: Initializing FAQ database..."
echo ""
python3 -c "
from api.routes.faq_setup import setup_faq_system
setup_faq_system()
"
echo ""

# Step 3: Display status
echo "=========================================="
echo "✨ FAQ System Setup Complete!"
echo "=========================================="
echo ""
echo "📊 System Summary:"
echo "  ✓ Database schema created"
echo "  ✓ 6 FAQ categories initialized"
echo "  ✓ 12 sample FAQs loaded"
echo "  ✓ All tables ready for use"
echo ""
echo "🔗 Next Steps:"
echo "  1. Register FAQ routes in backend/main.py"
echo "  2. Start the backend server: python main.py"
echo "  3. Test API: curl http://localhost:8000/api/v1/faq/health"
echo "  4. Integrate frontend with API service"
echo ""
echo "📖 Documentation:"
echo "  • API Reference: FAQ_API_DOCUMENTATION.md"
echo "  • Integration Guide: INTEGRATION_GUIDE.md"
echo "  • Service Layer: faq_service.py"
echo ""
echo "🎯 Ready to build! 🚀"
echo ""
