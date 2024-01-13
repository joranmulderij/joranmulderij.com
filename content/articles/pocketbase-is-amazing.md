---
title: "Pocketbase Is Amazing (for small projects)"
date: 2024-01-13T16:09:57+05:00
draft: false

summary: "Pocketbase is an amazing backend framework. Let me show you why."
tags:
  - Backend
  - PocketBase
image: /img/pocketbase.png
---

[Pocketbase](https://pocketbase.io/) is an amazing backend framework. Let me show you why.

## What is Pocketbase?

> Pocketbase is an Open Source backend for your next SaaS and Mobile app in 1 file

That is how pocketbase advertises itself. The interesting part about this is the fact that the whole backend fits within one file. That includes the database. Running that executable will start the backend and serve the apis and the manager. Pocketbase includes a database management frontend that can be used to configure all the settings, create tables, edit schemas, etc. Setting everything up can be done in minutes.

## Pocketbase internals

Pocketbase is essentially a really nice wrapper around SQLite. The wrapper exposes read and write apis to all the tables, managed authentication, file storage, and a manager application. Pocketbase can be extended really easily using the go programming language. If there is anything that is not built into pocketbase, you can just add it yourself. You have direct access to the SQLite database and you can run raw queries. There are almost no restrictions to what you can do within the framework.

## What makes Pocketbase great

### Extendibility

The most amazing thing about Pocketbase is that everything about it can be extended. If something is not built into pocketbase, just create it. You can write go code that deeply interacts with Pocketbase or just completely bypasses it. The code you write has exactly the same privileges as Pocketbase itself, and exactly the same control as a plain go backend with a SQLite database package pre-initialized. You can just run raw queries, create tables that Pocketbase does not know about, or work with any go package.

### Frontend libraries

Pocketbase also includes frontend SDK's for JavaScript and Dart. The following example shows how simple it is to interact with the apis from the native frontend language. Dart was chosen for this example because it is superior to JavaScript in almost every way.

```dart
import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('http://127.0.0.1:8090');

final posts = await pb.collection('posts').getList(
  page:    1,
  perPage: 20,
  filter:  'public = true',
  sort:    '-created',
);
```

It's that simple.

Creating, updating, and deleting records is just as easy. You can just pass these to `.fromJson` constructors and have type safe values that you can pass around everywhere.

### Admin application

Every pocketbase instance also serves an admin/manager application that can be used to create and edit collections (tables), manipulate data, and manage other settings.

### Simple Security

So how is security handled? The way this is done is by security rules. Every collection (table) has 5 security rules, for `list`, `view`, `create`, `update`, `delete`. The syntax for security rules is really simple and well documented. These security rules can be changed from the admin application.

## What about Firebase?

Pocketbase is often compared to firebase, but that is not fair in my opinion. Firebase is a suite of tools that can be combined to create a backend. That includes a document database, authentication system, and a lot more. The biggest downside of Firebase is it's lock-in. Once you start using Firebase, there is no easy way to move away from it. Your data is now structured the way that makes sense in Firebase, which, by the way, is not great. Firebase's main database, firestore, is a document database that forces you to structure data in a potentially illogical way. Document databases are also schema-less, which means that the frontend is responsible for structuring all your data. The only way to validate data in the backend is using security rules, which, in firestore, are pretty complicated, especially compared to Pocketbase's security rules. Document databases are also really inefficient. Another downside is it's pricing. You pay for every interaction with the database. Sure, there is a generous free trial, but once you grow out of that, Firebase is really expensive. There are also pieces of backend functionality that are really difficult to implement. You can write serverless functions, but those are way harder to make work, a lot less efficient, and more expensive than code that just runs on an always-alive server.

With Pocketbase, however, you are not locked into the framework. The reason for this is that Pocketbase is extendible in a way that if you wanted to, you could just piece by piece move away from pocketbase until you are left with a normal go backend. Pocketbase's database, SQLite, is an extremely popular database that is used for many different applications. Sure, it cannot handle a lot of traffic, but assuming you don't need a lot of traffic, this is fine. Because SQLite is a relational database, you can just structure your data relationally and if you ever wanted to migrate to a different database, your data is already structured relationally, so even migrating to something like PostgreSQL or MySQL should not be too difficult.

## Limitations of pocketbase

Though Pocketbase is a great tool, it is not a one-size-fits-all solution. There are some limitations to using pocketbase. Most of them have to do with the fact that pocketbase is built on a monolith architecture. Everything has to run on a single server, both the backend code and the database. When you run out of computational power, you need to run it on a larger server; you cannot split the work up. This is fine for smaller projects, but does not scale really well. Another downside is that the database is stored on the disk of the server. This means that pocketbase needs to run on a real server (or a VM), which you have to manage yourself. And of course, SQLite is not built for high numbers of reads and writes. 

Now don't think that Pocketbase stops working after a couple hundred users. A small shared server can serve WebSocket connections to more than 10,000 users. If you don't use real-time functionality you could easily handle even more on just a single $10/month server. 

## Conclusion

When building a backend with a monolith architecture, Pocketbase is one of the best places to start. If you are just trying to get a simple backend with database running, Pocketbase is great.
