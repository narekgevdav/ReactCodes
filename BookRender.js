import React from 'react';
import firebase from '../Firebase/Firebase'
import { useState } from 'react';
import Book from './Book'
import { useEffect } from 'react'

function BookRender() {
    const [book, setBook] = useState();

    useEffect(function fire() {
        const abortController = new AbortController();
        const db = firebase.firestore();
        const books = db.collection("bookslibrary");
        books.get()
            .then(querySnapshot => {
                const list = [];
                querySnapshot.forEach(doc => {
                    const data = doc.data();

                    const book = {
                        author: data.author,
                        title: data.title,
                        description: data.description,
                        shortDescription: data.shortDescription,
                        startDate: data.startDate,
                        endDate: data.endDate,
                        comments: data.comments,
                        rate: data.rate,
                        status: data.status,
                        page: data.page,
                        pages: data.pages,
                        imageUrl: data.imageUrl,
                        ISBN: data.ISBN
                    };

                    list.push(book);
                });
                setBook(list)
            })
            .catch(err => console.error(err.message));

        return function cleanup() {
            abortController.abort()
        }
    }, []);

    return (
        <div className="App">
            <div className="appContainer container">
                <div className="booksWrapper row">
                    {
                        book && book.map(book => <Book key={book.ISBN} book={book} status = {{params: {key: "else"}}} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default BookRender;
