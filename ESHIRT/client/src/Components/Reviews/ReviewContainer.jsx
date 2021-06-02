import React from "react";
import { getShirtReview, postShirtReview, getShirtScore, deleteReview} from "../../Actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useLayoutEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";


import {useTokenDecode} from '../../hooks/tokenDecoding';
import {useHistory} from 'react-router-dom'
import defaultImg from '../../Images/no_user_image.png'
