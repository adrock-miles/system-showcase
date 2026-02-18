---
id: ios
title: iOS Guide
sidebar_position: 4
---

# Using Tokens in iOS (Swift)

Two Swift files are generated: `StyleDictionaryColor.swift` and `StyleDictionarySize.swift`.

## Setup

Add the generated Swift files to your Xcode project:

```
MyApp/
└── Sources/
    └── DesignTokens/
        ├── StyleDictionaryColor.swift   ← from dist/ios/StyleDictionaryColor.swift
        └── StyleDictionarySize.swift    ← from dist/ios/StyleDictionarySize.swift
```

Or integrate via a build phase script that runs `npm run build:tokens` and copies outputs.

## Colors

### UIKit

```swift
import UIKit

// Access a color constant
let primaryColor = StyleDictionaryColor.colorBlue600

// Apply to a view
button.backgroundColor = StyleDictionaryColor.colorBlue600
button.setTitleColor(StyleDictionaryColor.colorWhite, for: .normal)

// Hover/pressed states
button.backgroundColor = StyleDictionaryColor.colorBlue700  // hover
button.backgroundColor = StyleDictionaryColor.colorBlue800  // pressed
```

### SwiftUI

```swift
import SwiftUI

// Wrap UIColor constants for SwiftUI use
extension Color {
    static let tokenPrimary = Color(StyleDictionaryColor.colorBlue600)
    static let tokenTextPrimary = Color(StyleDictionaryColor.colorGray900)
    static let tokenSurface = Color(StyleDictionaryColor.colorWhite)
}

struct PrimaryButton: View {
    var body: some View {
        Button("Tap me") { }
            .foregroundColor(.tokenSurface)
            .background(Color.tokenPrimary)
            .cornerRadius(8)
    }
}
```

## Dimensions

```swift
import UIKit

// Spacing
let cardPadding = StyleDictionarySize.spacing6       // 24pt
let sectionGap = StyleDictionarySize.spacing8        // 32pt

// Typography
let bodySize = StyleDictionarySize.fontSizeBase      // 16pt
let headingSize = StyleDictionarySize.fontSize3Xl    // 30pt

// Border radius
let cardRadius = StyleDictionarySize.borderRadiusLg  // 8pt
let pillRadius = StyleDictionarySize.borderRadiusFull

// Apply to views
card.layer.cornerRadius = StyleDictionarySize.borderRadiusLg
titleLabel.font = UIFont.systemFont(ofSize: StyleDictionarySize.fontSize3Xl,
                                    weight: .bold)
```

## SwiftUI layout

```swift
struct TokenCard: View {
    var title: String
    var body: some View {
        VStack(alignment: .leading, spacing: CGFloat(StyleDictionarySize.spacing4)) {
            Text(title)
                .font(.system(size: CGFloat(StyleDictionarySize.fontSizeXl), weight: .semibold))
                .foregroundColor(Color(StyleDictionaryColor.colorGray900))
        }
        .padding(CGFloat(StyleDictionarySize.spacing6))
        .background(Color(StyleDictionaryColor.colorWhite))
        .cornerRadius(CGFloat(StyleDictionarySize.borderRadiusLg))
        .shadow(
            color: Color.black.opacity(0.1),
            radius: 6, x: 0, y: 4
        )
    }
}
```

## Automating with Xcode build phases

Add a "Run Script" build phase before "Compile Sources":

```bash
cd "${SRCROOT}/../"  # path to repo root
npm run build:tokens
cp dist/ios/StyleDictionaryColor.swift "${SRCROOT}/Sources/DesignTokens/"
cp dist/ios/StyleDictionarySize.swift "${SRCROOT}/Sources/DesignTokens/"
```
