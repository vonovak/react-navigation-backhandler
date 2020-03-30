# react-navigation-backhandler

Easily handle Android back button behavior with React-Navigation.

> NOTE use version 1 of this package for `react-navigation` version 4 and lower
>
> use version 2 of this package for `react-navigation` version 5

## Installation

Install with npm:

```sh
$ npm install react-navigation-backhandler
```

Install with yarn:

```sh
$ yarn add react-navigation-backhandler
```

## Usage

The following snippet demonstrates the usage. Note that `onBackButtonPressAndroid` will only be called if `SomeComponent` is placed in a screen that is focused (the one user is directly interacting with).

Behind the scenes, the `onBackButtonPressAndroid` handler is registered before a screen is focused, and unregistered before going away from it, leaving you with a declarative interface to interact with. Internally, this package uses apis that are provided by `react-navigation`.

You may use `useAndroidBackHandler` or `AndroidBackHandler` component anywhere in your app's React tree, it does not need to be placed directly in the screen component.

There are two ways of using this library:

1. [As hook](#use-as-hook)
1. [As component](#use-as-component)

### Use as hook

```js
import { useAndroidBackHandler } from "react-navigation-backhandler";

const SomeComponent = () => {
  useAndroidBackHandler(() => {
    /*
     *   Returning `true` denotes that we have handled the event,
     *   and react-navigation's lister will not get called, thus not popping the screen.
     *
     *   Returning `false` will cause the event to bubble up and react-navigation's listener will pop the screen.
     * */

    if (youWantToHandleTheBackButtonPress) {
      // do something
      return true;
    }

    return false;
  });

  return <BodyOfYourScreen />;
};
```

### Use as component

> **Note:** You can also use the component "inline" without children: `<AndroidBackHandler onBackPress={this.onBackButtonPressAndroid} />`

```js
import { AndroidBackHandler } from "react-navigation-backhandler";

class SomeComponent extends React.Component {
  onBackButtonPressAndroid = () => {
    /*
     *   Returning `true` from `onBackButtonPressAndroid` denotes that we have handled the event,
     *   and react-navigation's lister will not get called, thus not popping the screen.
     *
     *   Returning `false` will cause the event to bubble up and react-navigation's listener will pop the screen.
     * */

    if (youWantToHandleTheBackButtonPress) {
      // do something
      return true;
    }

    return false;
  };

  render() {
    return (
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <BodyOfYourScreen />
      </AndroidBackHandler>
    );
  }
}
```

## Warning

The package was only tested to be used in screens in stack navigator, other use cases may not work.
