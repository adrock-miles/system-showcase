---
id: android
title: Android Guide
sidebar_position: 3
---

# Using Tokens in Android

Two XML resource files are generated: `colors.xml` and `dimens.xml`.

## Setup

Copy the generated files into your Android project:

```
app/
└── src/
    └── main/
        └── res/
            └── values/
                ├── colors.xml    ← from dist/android/colors.xml
                └── dimens.xml    ← from dist/android/dimens.xml
```

Or automate this with a Gradle task that runs the token build and copies outputs.

## Colors

### In XML layouts

```xml
<Button
    android:backgroundTint="@color/color_blue_600"
    android:textColor="@color/color_white" />

<TextView
    android:textColor="@color/color_gray_900" />
```

### In Kotlin/Java

```kotlin
// Get color from resources
val blue600 = ContextCompat.getColor(context, R.color.color_blue_600)

// Apply to a view
view.setBackgroundColor(ContextCompat.getColor(context, R.color.color_blue_600))

// With ViewBinding
binding.button.backgroundTintList =
    ColorStateList.valueOf(ContextCompat.getColor(this, R.color.semantic_color_action_primary))
```

### State selectors

```xml
<!-- res/color/button_bg.xml -->
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:color="@color/color_blue_800"
          android:state_pressed="true" />
    <item android:color="@color/color_blue_700"
          android:state_hovered="true" />
    <item android:color="@color/color_blue_600" />
</selector>
```

## Dimensions

### In XML layouts

```xml
<View
    android:padding="@dimen/spacing_4"
    android:layout_marginBottom="@dimen/spacing_6" />

<TextView
    android:textSize="@dimen/font_size_base" />

<View
    android:background="@drawable/rounded_card" />
```

### In Kotlin/Java

```kotlin
val spacing4 = resources.getDimensionPixelSize(R.dimen.spacing_4)
val textBase = resources.getDimension(R.dimen.font_size_base)
```

### Shape drawable with radius token

```xml
<!-- res/drawable/rounded_card.xml -->
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <corners android:radius="@dimen/border_radius_lg" />
    <solid android:color="@color/color_white" />
</shape>
```

## Theming with MaterialComponents

```xml
<!-- res/values/themes.xml -->
<style name="Theme.App" parent="Theme.Material3.Light.NoActionBar">
    <item name="colorPrimary">@color/color_blue_600</item>
    <item name="colorPrimaryVariant">@color/color_blue_700</item>
    <item name="colorOnPrimary">@color/color_white</item>
    <item name="colorError">@color/color_red_500</item>
</style>
```
