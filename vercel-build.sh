#!/bin/bash\n\necho \"Building the GDevelopers Next.js application...\"\n\nnpm install\n\ncd apps/main\nnpm install\nnpm run build\n\necho \"Build completed successfully!\"
