#!/bin/bash

echo "🔑 Your SSH Public Key:"
echo ""
cat ~/.ssh/id_ed25519.pub
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Copy the key above (it's already in your clipboard if you have pbcopy)"
echo ""
echo "2. Open this link in your browser:"
echo "   https://github.com/settings/keys"
echo ""
echo "3. Click 'New SSH key'"
echo "4. Title: MacBook (or any name)"
echo "5. Paste the key"
echo "6. Click 'Add SSH key'"
echo ""
echo "7. Then come back and run: git push -u origin main"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Try to copy to clipboard if on macOS
if command -v pbcopy &> /dev/null; then
    cat ~/.ssh/id_ed25519.pub | pbcopy
    echo "✅ Key copied to clipboard!"
    echo ""
fi

