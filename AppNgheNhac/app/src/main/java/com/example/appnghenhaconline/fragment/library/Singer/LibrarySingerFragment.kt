package com.example.appnghenhaconline.fragment.library.Singer

import android.app.DownloadManager
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.appnghenhaconline.MyLib
import com.example.appnghenhaconline.R
import com.example.appnghenhaconline.adapter.albumAdapter.FollowAlbumAdapter
import com.example.appnghenhaconline.adapter.playlistAdapter.PlaylistSelectedAdapter
import com.example.appnghenhaconline.adapter.singerAdapter.FollowSingerAdapter
import com.example.appnghenhaconline.api.ApiService
import com.example.appnghenhaconline.dataLocalManager.SharedPreferences.SessionUser
import com.example.appnghenhaconline.fragment.library.LibraryFragment
import com.example.appnghenhaconline.models.album.Album
import com.example.appnghenhaconline.models.singer.DataSinger
import com.example.appnghenhaconline.models.singer.Singer
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import okhttp3.MediaType
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.lang.reflect.Type

class LibrarySingerFragment: Fragment() {
    internal lateinit var view: View
    private lateinit var btnBack: ImageView
    private lateinit var listFollowSinger: ArrayList<Singer>
    private lateinit var rcvFollowSinger: RecyclerView
    private lateinit var followSingerAdapter: FollowSingerAdapter
    private lateinit var session: SessionUser


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                                savedInstanceState: Bundle?): View? {
        view = inflater.inflate(R.layout.fm_library_singer_fragment, container, false)

        return view
    }

    override fun onStart() {
        super.onStart()
        session = SessionUser(this.requireContext())
        init()
    }

    private fun init(){
        btnBack = view.findViewById(R.id.btnBack)
        initFollowPlaylist()
        event()
    }

    private fun event(){
        btnBack.setOnClickListener {
            val fragmentLayout = LibraryFragment()
            MyLib.changeFragment(requireActivity(), fragmentLayout)
        }
    }

    private fun initFollowPlaylist(){
        listFollowSinger = ArrayList()
        followSingerAdapter = FollowSingerAdapter(view.context, listFollowSinger)

        rcvFollowSinger = view.findViewById(R.id.rcvFollowSinger)
        rcvFollowSinger.setHasFixedSize(true)
        rcvFollowSinger.layoutManager = LinearLayoutManager(view.context,
            LinearLayoutManager.VERTICAL, false)
        rcvFollowSinger.adapter = followSingerAdapter

        val user = session.getUserDetails()
        val gson = Gson()
        val type: Type = object : TypeToken<ArrayList<String?>?>() {}.type
        val singerFollow : ArrayList<String> = gson.fromJson(user[session.KEY_SINGER],type)
        MyLib.showLog(singerFollow.toString())
        //Nghĩa lấy cái singerFollow truyền vào cuối cái call Api nha

        callApiListFollowSinger(listFollowSinger, followSingerAdapter, singerFollow)
    }

    // Api lấy list Singer yêu thich
    private fun callApiListFollowSinger(list : ArrayList<Singer>, adapter : FollowSingerAdapter, listIdSinger : ArrayList<String>) {
        ApiService.apiService.getListLoveSinger(listIdSinger).enqueue(object : Callback<DataSinger?> {
            override fun onResponse(call: Call<DataSinger?>, response: Response<DataSinger?>) {
                val dataSinger = response.body()
                if(dataSinger != null) {
                    if (!dataSinger.error) {
                        MyLib.showLog(dataSinger.singers.toString())

                        val dataListSinger = dataSinger.singers

                        list.addAll(dataListSinger)
                        adapter.notifyDataSetChanged()
                    }
                    else {
                        MyLib.showToast(requireContext(),dataSinger.message)
                    }
                }
            }

            override fun onFailure(call: Call<DataSinger?>, t: Throwable) {
                MyLib.showToast(requireContext(),"Call Api Error" )
            }
        })
    }
}