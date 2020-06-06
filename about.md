# About Ionic Edit Object Sample

This project shows how to build an Ionic application page that lets users edit data in the application, but with the option to cancel edits. In Ionic apps, most edit pages look like this:

![Ionic Simple Edit Page](images/edit1.png)

When the user makes changes, they tap the left arrow button to to return to the previous page and all changes are automatically passed to the rest of the app.

What I want is something like this:

![Edit 2](images/edit2.png)

Here the user has **Cancel** and **Save** (done) buttons to use to tell the application when they want to keep or discard changes made on the page. 

This second option is a harder implementation because Ionic automatically refreshes changed data everywhere in the application, so when you make changes to **Field 1** and **Field 2** on the page, Ionic helps you out by automatically any UI components that display the data. Helpful, but sometimes annoying.

To get around this feature, you must make a copy of the data object when editing it on a page. Then, when the user taps the **Save** or **Done** button, copy the data object values to the original object. Let me show you how this works.

## Home Page

For this sample application, I started by creating a simple **DataObject** class:

```typescript
export class DataObject {
    field1: string;
    field2: string;
}
```

I placed the file in the project's `app/src/classes/data-object.ts` file. 

Next, in the application's **Home** page, I added the following code to top of the project's `home.page.ts` file:

```typescript
import {DataObject} from '../classes/data-object';
```

This loads the data object class. Inside the `HomePage` class declaration, I created a simple `dataObject` variable we'll use to demonstrate the different options in the sample app:

```typescript
dataObject: DataObject = {
  field1: 'Some random value',
  field2: 'Another random value',
};
```

In the project's **Home** page, I added some HTML to render the data object properties. I added the code to the project's `home.page.html` file:

```html
<ion-item-divider>
  <ion-label>
    Example Data Object
  </ion-label>
</ion-item-divider>
<ion-item>
  <ion-label class="ion-text-wrap">
    <strong>Field 1:</strong> {{dataObject.field1}}
  </ion-label>
</ion-item>
<ion-item>
  <ion-label class="ion-text-wrap">
    <strong>Field 2:</strong> {{dataObject.field2}}
  </ion-label>
</ion-item>
```

At this point, whatever values `dataObject` object has for `field` and `field2` will display on the page, changing automatically when they change elsewhere in the app. Lets see this in action.

To load the default approach edit page (no cancel), I added the following code to the project's `home.page.ts` file:

```typescript
editNoCancel() {
  console.log('HomePage: editNoCancel()');
  this.nav.navigateForward('/edit-no-cancel', { state: { dataObject: this.dataObject } });
}
```

This function executes when the user taps the **Edit (No Cancel)** button on the home page; it navigates to the `edit-no-cancel` page and passes the `dataObject` object to the page using a `state` object:

```typescript
{ state: { dataObject: this.dataObject } }
```

On the other side, in the `edit-no-cancel` page, the code there will retrieve the state object and use it to manage the object properties in the form.

## Edit (No Cancel) Page

Now we'll look at the default way data editing is done in an Ionic application. In the project's `edit-no-cancel.page.tx` file, I made very small changes. First I load the `DataObject` class by adding the following import to the top of the file:

```typescript
import {DataObject} from '../classes/data-object';
```

Next, in the project's class declaration, I define a `dataObject` object again, this one used by the page to manage access to the data passed to the page.

```typescript
dataObject: DataObject;
```

Next, the page must retrieve the state object passed to it from the app's **Home** page; to do this we execute the following code on the `ngOnInit` event:

```typescript
ngOnInit() {
  this.route.queryParams.subscribe(params => {
    const state = this.router.getCurrentNavigation().extras.state;
    this.dataObject = state.dataObject;
  });
}
```

When this code runs, the page's local `dataObject` object contains the data from the **Home** page's `dataObject` object. Under the covers, Ionic automatically creates the necessary observables and subscriptions to update the data on the app's home page when the properties of this local object change. There's one caveat I'll cover later in this article.

> Note: I could have used a different object name here if I wanted to, calling the local version of `dataObject` `localObject` or `johnObject` if I wanted, it wouldn't change anything about the way this works.

In the project's `edit-no-cancel.html`, I created a simple form using the following:

```html
<ion-header>
  <ion-toolbar color="primary">
    <ion-buttons slot="start">
      <ion-back-button></ion-back-button>
    </ion-buttons>
    <ion-title>Edit (No Cancel)</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <ion-list>
    <ion-label class="ion-text-wrap">
      Edit one of the fields below, then tap the arrow button to return to the <strong>Home Page</strong>. You should see your changes reflected there automatically.
    </ion-label>
    <ion-item>
      <ion-label><strong>Field 1</strong></ion-label>
      <ion-input type="text" [(ngModel)]="dataObject.field1"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label><strong>Field 2</strong></ion-label>
      <ion-input type="text" [(ngModel)]="dataObject.field2"></ion-input>
    </ion-item>
  </ion-list>
</ion-content>
```

With this in place, the form populates the input fields with the `field1` and `fiedl2` properties from the local `dataObject` object. The `[(ngModel)]` tag creates an Angular Model. wiring the input field to the associated property in the data object. This sets it up so any changes made in the form are automatically passed to the local `dataObject` object, then Ionic automatically passes those changes to the `dataObject` on the **Home** page. Reactive development at its finest.

-- I should probably add an image here illustrating what I just said --

## Edit Cancel Page

The default, reactive approach to data management in Ionic applications likely works very well for most applications, but I've found that for many applications, something different is needed. When editing application settings, for example, I always want to give app users the ability to cancel (discard) any changes they make, just in case they're playing around or make a mistake while editing. Mobile devices don't have the default ctrl-Z undo option you'll find on Linux, macOS, or Windows, so I like to give users a way to recover from mistakes.

Before we jump into the page, I have to give you a little background information.

In order to be able to discard changes to a data object in Ionic, you must cut the connection with the data object before you begin changing it. Ionic automatically wires up the observables and stuff needed to make your app reactive, and doesn't provide any mechanism for turning that off. 

When I first encountered this issue years ago (in one of my first Ionic apps), the solution was to use the [Lodash](https://lodash.com/) library to make a clone of the data object, modify properties of the cloned object on the input form, then copy those properties back to the original object when the user saves their changes. That worked great for a while, but then something changed in Lodash or in Ionic, because it stopped working in the next app where I tried to use this approach. 

Fortunately, [Mike Hartington](https://twitter.com/mhartington) (Ionic) was able to provide a solution; he found a post somewhere where a developer solved this problem with the following code:

```javascript
export default function clone(obj) {
    let copy;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || 'object' !== typeof obj) {
        return obj;
    }
    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = clone(obj[attr]);
            }
        }
        return copy;
    }
    throw new Error('Unable to copy object, type not supported.');
}
```

You can find this code in the project's `src/app/utils.ts` file.

Alright, lets look at the **Edit (Cancel)** page, I'll show you how this works.

Looking at the project's `edit-cancel.page.ts` file; at the top of the file I imported the `clone` function I just showed you:

```javascript
import clone from '../utils';
```

Inside the class, I created an additional object, called `tempObject`:

```typescript
dataObject: DataObject;
tempObject: DataObject;
```

Next, there's a small change to the `ngOnInit` function, and this is where the *magic* starts.

```javascript
ngOnInit() {
  console.log('EditCancelPage: ngOnInit()');
  this.route.queryParams.subscribe(params => {
    // Pull state off the router
    const state = this.router.getCurrentNavigation().extras.state;
    // Get the data object off the state
    this.dataObject = state.dataObject;
    // Clone it to work with it locally
    this.tempObject = clone(this.dataObject);
  });
}
```

What happens here is I pulled the `dataObject` from the page's `state` just like I did in the **Edit (No Cancel)** page, but then I made a clone of it in `tempObject`.

Then, in the page's `edit-cancel.page.html` file, I made a couple of changes. In the header, I replaced the default back button with the **Cancel** and **Done** buttons. In the form, instead of pulling in the properties of the `dataObject` object, I instead pull them from `tempObject`; this isolates changes made here from the rest of the application.

```html
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>Edit (Cancel)</ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="dismiss()">Cancel</ion-button>
      <ion-button (click)="save()">Done</ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <ion-list>
    <ion-label class="ion-text-wrap">
      Edit one of the fields below, then tap the <strong>Save</strong> button to save your changes, and the <strong>Cancel</strong>button to disgard changes, then return to the <strong>Home Page</strong>.    </ion-label>
    <ion-item>
      <ion-label><strong>Field 1</strong></ion-label>
      <ion-input type="text" [(ngModel)]="tempObject.field1"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label><strong>Field 2</strong></ion-label>
      <ion-input type="text" [(ngModel)]="tempObject.field2"></ion-input>
    </ion-item>
  </ion-list>
</ion-content>
```

Now, since I pulled the default back button from the page, I must add code to handle the cancel and done cases manually.  Notice in the HTML above that the buttons have `(click)` events, all I have to do is add the code for those events and I'm done. 

When the user taps the **Cancel** button, all I have to do is discard the page and return to the **Home** page. The simplest way to do this is to just pop the page off the stack as shown in the following code.

```typescript
dismiss() {
  console.log('EditCancelPage: dismiss()');
  // Pop the page off the stack
  this.navCtrl.pop();
}
```

I could have forced a navigation to the **Home** page, but since for many apps I could possibly get to this edit page from any of the app's pages, the approach I used is best.

For the **Done** case, the process is just a little different:

```typescript
save() {
  console.log('EditCancelPage: save()');
  // Have to directly modify the properties to get Ionic to pass the values back
  this.dataObject.field1 = this.tempObject.field1;
  this.dataObject.field2 = this.tempObject.field2;
  // Pop the page off the stack
  this.navCtrl.pop();
}
```

What I need to do when the user saves their changes is get the properties from the `tempObject` back into `dataObject`. You'd think I could just clone the `tempObject` back into `dataObject` but that doesn't work; Ionic doesn't pick up the change in that case. When you manually update each property like I do in that code, Ionic/Angular pick up the changes and successfully passes them back to the **Home** page.

***

If you find this code useful, and feel like thanking me for providing it, please consider making a purchase from [my Amazon Wish List](https://amzn.com/w/1WI6AAUKPT5P9). You can find information on many different topics on my [personal blog](http://www.johnwargo.com). Learn about all of my publications at [John Wargo Books](http://www.johnwargobooks.com).
