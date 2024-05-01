package com.ntg.NewsBackEnd.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "2D4A614E645267556B587032734568897798456236548648998465465325sad654sa357638792F423F4428472B4B6250655368566D";

    private static final int TOKEN_VALIDITY = 1*60*1000;

//    private Key getSigningKey() {
//        byte[] keyBytes = Decoders.BASE64.decode(this.SECRET_KEY);
//        return Keys.hmacShaKeyFor(keyBytes);
//    }
    public String getUserNameFromToken(String token){
        return getClaimsFromToken(token, Claims::getSubject);
    }

    private <T> T getClaimsFromToken(String token, Function<Claims, T> claimResolver){
       final Claims claims= getAllClaimsFromToken(token);
       return claimResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token){
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public Boolean validateToken(String token, UserDetails userDetails){
        final String userName = getUserNameFromToken(token);
        return ( userName.equals(userDetails.getUsername()) && !isTokenExpired(token) );
    }

    private Boolean isTokenExpired(String token){
      final Date expirationDate = getExpirationDateFromToken(token);
      return expirationDate.before(new Date());
    }

    private Date getExpirationDateFromToken(String token){
        return getClaimsFromToken(token,Claims::getExpiration);
    }

    public String generateToken(UserDetails userDetails){
        Map<String ,Object> claims = new HashMap<>();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY))
                .signWith(SignatureAlgorithm.HS512,SECRET_KEY)
                .compact();
    }
}
