
import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import LoginForm from "./Login";
import SignUpForm from "./Signup";
import Home from "./Home";
import { ViewMoods, MoodForm } from './Mood';
import { ViewPet, ViewPetSimple } from './Pet';
import {ViewReflections, ReflectionInput } from './Reflection';
import {ViewJournals,ViewJournal,JournalInput} from './Journal';


export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/home" component={() => <Home baseUrl={baseUrl}/>}/>
                    <Route path="/pet"component={ViewPet}/>
                    <Route path="/journals" component={ViewJournals}/>
                    <Route path="/newjournal"component={JournalInput}/>
                    <Route path="/reflections"component={ViewReflections}/>
                    <Route path="/newreflection"component={ReflectionInput}/>
                    <Route path="/moods"component={ViewMoods}/>
                    <Route path="/newmood"component={MoodForm}/>
                </Switch>
            </Router>
        )
    }
}